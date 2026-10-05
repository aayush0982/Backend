package com.cg.product.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.product.entity.Product;

@Repository
public interface productRepo extends JpaRepository<Product, Integer> {

    List<Product> findByProductPriceGreaterThan(Double productPrice);
    List<Product> findByProductPriceLessThan(Double productPrice);
    // Define custom query methods if needed

    List<Product> findByProductPriceBetween(Double minPrice, Double maxPrice);

    List<Product> findByProductNameContaining(String productName);

}
