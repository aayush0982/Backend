package com.cg.product.exception;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(Integer productId) {
        super("Product not found for product ID: " + productId);
    }
}
