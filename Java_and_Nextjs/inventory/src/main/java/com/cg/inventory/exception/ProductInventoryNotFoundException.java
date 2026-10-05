package com.cg.inventory.exception;

public class ProductInventoryNotFoundException extends RuntimeException {

    public ProductInventoryNotFoundException(Integer productId) {
        super("Product inventory not found for product ID: " + productId);
    }
}
