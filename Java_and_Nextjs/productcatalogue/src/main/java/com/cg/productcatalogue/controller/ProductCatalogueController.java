package com.cg.productcatalogue.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.productcatalogue.entity.ProductCatalogue;
import com.cg.productcatalogue.exception.ProductCatalogueNotFoundException;
import com.cg.productcatalogue.service.ProductCatalogueServImpl;

@RestController
public class ProductCatalogueController {
    private final ProductCatalogueServImpl productCatalogueService;

    public ProductCatalogueController(ProductCatalogueServImpl productCatalogueService) {
        this.productCatalogueService = productCatalogueService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addProduct")
    public ResponseEntity<String> addProduct(@RequestBody ProductCatalogue productCatalogue) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productCatalogueService.addProduct(productCatalogue));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProductCatalogue>> getAllProducts() {
        return ResponseEntity.ok(productCatalogueService.getAllProducts());
    }

    @GetMapping("/getByCategoryWise")
    public ResponseEntity<List<ProductCatalogue>> getProductByCategory(
            @RequestParam String categoryName) {
        return ResponseEntity.ok(productCatalogueService.getProductByCategory(categoryName));
    }

    @GetMapping("/getByRange")
    public ResponseEntity<List<ProductCatalogue>> getProductByRange(
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        return ResponseEntity.ok(productCatalogueService.getProductByRange(minPrice, maxPrice));
    }

    @GetMapping("/getByName")
    public ResponseEntity<ProductCatalogue> getProductByName(
            @RequestParam String productName) {
        ProductCatalogue product = productCatalogueService.getProductByName(productName);
        if (product == null) {
            throw new ProductCatalogueNotFoundException(productName);
        }
        return ResponseEntity.ok(product);
    }

    @GetMapping("/getById")
    public ResponseEntity<ProductCatalogue> getProductById(
            @RequestParam int productId) {
        ProductCatalogue product = productCatalogueService.getProductById(productId);
        if (product == null) {
            throw new ProductCatalogueNotFoundException(productId);
        }
        return ResponseEntity.ok(product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/deleteProduct")
    public ResponseEntity<String> deleteProduct(@RequestParam Integer productId) {
        return ResponseEntity.ok(productCatalogueService.deleteProduct(productId));
    }

}
