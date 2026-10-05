package com.cg.inventory.exception;

public class InsufficientInventoryException extends RuntimeException {

    public InsufficientInventoryException(Integer productId) {
        super("Insufficient product quantity in inventory for product ID: " + productId);
    }
}
