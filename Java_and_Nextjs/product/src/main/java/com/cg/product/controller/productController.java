package com.cg.product.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.cg.product.entity.Product;
import com.cg.product.exception.ProductAlreadyExistsException;
import com.cg.product.exception.ProductNotFoundException;
import com.cg.product.service.productSerImpl;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/products")
public class productController {

    private final productSerImpl productService;

    productController(productSerImpl productService) {
        this.productService = productService;
    }

    @GetMapping("/getById")
    public ResponseEntity<Product> getById(@RequestParam int productId) {
        Product product = productService.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        return ResponseEntity.ok(product);
    }

    @GetMapping("/getByPriceGreaterThan")
    public ResponseEntity<List<Product>> getByPriceGreaterThan(@RequestParam double price) {
        return ResponseEntity.ok(productService.findByPriceGreaterThan(price));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/getByPriceLessThan")
    public ResponseEntity<List<Product>> getByPriceLessThan(@RequestParam double price) {
        return ResponseEntity.ok(productService.findByProductPriceLessThan(price));
    }

    @GetMapping("/getByPriceBetween")
    public ResponseEntity<List<Product>> getByPriceBetween(@RequestParam double minPrice, @RequestParam double maxPrice) {
        return ResponseEntity.ok(productService.findByProductPriceBetween(minPrice, maxPrice));
    }

    @PostMapping("/save")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        if (productService.findById(product.getProductId()).isPresent()) {
            throw new ProductAlreadyExistsException(product.getProductId());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(product));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int productId) {
        if (productService.findById(productId).isEmpty()) {
            throw new ProductNotFoundException(productId);
        }
        productService.deleteById(productId);
        return ResponseEntity.noContent().build();
    }
}
