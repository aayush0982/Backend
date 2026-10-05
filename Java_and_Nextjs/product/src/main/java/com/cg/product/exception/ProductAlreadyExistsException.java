package com.cg.product.exception;

public class ProductAlreadyExistsException extends RuntimeException {

    public ProductAlreadyExistsException(Integer productId) {
        super("Product already exists for product ID: " + productId);
    }
}
