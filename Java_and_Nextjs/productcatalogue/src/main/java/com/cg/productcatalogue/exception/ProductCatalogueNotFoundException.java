package com.cg.productcatalogue.exception;

public class ProductCatalogueNotFoundException extends RuntimeException {

    public ProductCatalogueNotFoundException(String productName) {
        super("Product catalogue entry not found for product name: " + productName);
    }

    public ProductCatalogueNotFoundException(Integer productId) {
        super("Product catalogue entry not found for product ID: " + productId);
    }
}
