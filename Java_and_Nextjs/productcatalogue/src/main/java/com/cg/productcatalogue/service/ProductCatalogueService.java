package com.cg.productcatalogue.service;

import java.util.List;

import com.cg.productcatalogue.entity.ProductCatalogue;

public interface ProductCatalogueService {
    public String addProduct(ProductCatalogue productCatalogue);
    public List<ProductCatalogue> getAllProducts();
    public List<ProductCatalogue> getProductByCategory(String categoryName);
    public List<ProductCatalogue> getProductByRange(double minPrice, double maxPrice);
    public ProductCatalogue getProductByName(String productName);
    public ProductCatalogue getProductById(int productId);
    public String deleteProduct(Integer productId);
}
