package com.cg.category.exception;

public class ProductNotFoundInCategoryException extends RuntimeException {

    public ProductNotFoundInCategoryException(Integer productId, String categoryName) {
        super("Product " + productId + " was not found in category: " + categoryName);
    }
}
