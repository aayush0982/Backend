package com.cg.product.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.cg.product.entity.Product;

@Repository
public interface productSerInterface {
    public Product save(Product product);
    public Optional<Product> findById(int productId);
    public void deleteById(int productId);
    public List<Product> findByProductPriceGreaterThan(Double productPrice);
    public List<Product> findByProductPriceLessThan(Double productPrice);
    public List<Product> findByProductPriceBetween(Double minPrice, Double maxPrice);
    public List<Product> findByProductNameContaining(String productName);
}
