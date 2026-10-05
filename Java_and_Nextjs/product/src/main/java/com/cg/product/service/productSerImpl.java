package com.cg.product.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cg.product.entity.Product;
import com.cg.product.repo.productRepo;

@Service
public class productSerImpl implements productSerInterface {

    private final productRepo productRepo;

    public productSerImpl(productRepo productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public Product save(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Optional<Product> findById(int productId) {
        return productRepo.findById(productId);
    }

    @Override
    public void deleteById(int productId) {
        productRepo.deleteById(productId);
    }

    @Override
    public List<Product> findByProductPriceGreaterThan(Double productPrice) {
        return productRepo.findByProductPriceGreaterThan(productPrice);
    }

    @Override
    public List<Product> findByProductPriceLessThan(Double productPrice) {
        return productRepo.findByProductPriceLessThan(productPrice);
    }

    @Override
    public List<Product> findByProductPriceBetween(Double minPrice, Double maxPrice) {
        return productRepo.findByProductPriceBetween(minPrice, maxPrice);
    }

    @Override
    public List<Product> findByProductNameContaining(String productName) {
        return productRepo.findByProductNameContaining(productName);
    }

    public List<Product> findByPriceGreaterThan(double price) {
        return productRepo.findByProductPriceGreaterThan(price);
    }

    public List<Product> findAll() {
        return productRepo.findAll();
    }

}
