package com.cg.productcatalogue.exception;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ProductCatalogueNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleProductNotFound(
            ProductCatalogueNotFoundException exception) {

        logger.warn("Product catalogue resource not found: {}", exception.getMessage());

        return error(HttpStatus.NOT_FOUND, exception.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequest(
            IllegalArgumentException exception) {

        logger.warn("Bad request: {}", exception.getMessage());

        return error(HttpStatus.BAD_REQUEST, exception.getMessage());
    }

    @ExceptionHandler(RestClientResponseException.class)
    public ResponseEntity<Map<String, Object>> handleDownstreamResponseError(
            RestClientResponseException exception) {

        logger.error("Downstream service returned HTTP status: {}",
                exception.getStatusCode().value());

        HttpStatus status = HttpStatus.valueOf(exception.getStatusCode().value());

        return error(status, "A required downstream service request failed");
    }

    @ExceptionHandler(RestClientException.class)
    public ResponseEntity<Map<String, Object>> handleDownstreamUnavailable(
            RestClientException exception) {

        logger.error("Downstream service is unavailable: {}", exception.getMessage(),
                exception);

        return error(HttpStatus.BAD_GATEWAY,
                "A required downstream service is unavailable");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleUnexpectedException(
            Exception exception) {

        logger.error("Unexpected application error", exception);

        return error(HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred");
    }

    private ResponseEntity<Map<String, Object>> error(
            HttpStatus status, String message) {

        logger.debug("Preparing error response. Status: {}, Message: {}",
                status.value(), message);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);

        return ResponseEntity.status(status).body(body);
    }
}
