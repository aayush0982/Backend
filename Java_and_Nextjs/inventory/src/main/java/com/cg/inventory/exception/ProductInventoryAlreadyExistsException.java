package com.cg.inventory.exception;

public class ProductInventoryAlreadyExistsException extends RuntimeException {

    public ProductInventoryAlreadyExistsException(Integer productId) {
        super("Product inventory already exists for product ID: " + productId);
    }
}
