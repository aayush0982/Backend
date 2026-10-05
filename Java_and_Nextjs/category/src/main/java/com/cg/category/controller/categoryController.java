package com.cg.category.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cg.category.entity.Category;
import com.cg.category.modal.product;
import com.cg.category.service.categorySerImpl;

@RestController
@RequestMapping("/category")
public class categoryController {

    private final categorySerImpl categoryService;
    private final RestTemplate restTemplate;

    public categoryController(categorySerImpl categoryService) {
        this.categoryService = categoryService;
        this.restTemplate = new RestTemplate();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCategory(@RequestBody Category category) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addCategory(category));
    }

    @GetMapping("/productsCategoryWise")
    public ResponseEntity<List<product>> getProductsByCategory(@RequestParam String categoryName) {

        List<Integer> productIds = categoryService.getProductIdsByCategoryName(categoryName);

        List<product> products = new ArrayList<>();

        for (Integer id : productIds) {

            String url = "http://localhost:8085/products/getById?productId=" + id;

            product p = restTemplate.getForObject(url, product.class);

            if (p != null) {
                products.add(p);
            }
        }

        return ResponseEntity.ok(products);
    }

    @PostMapping("/addProductToCategory")
    public ResponseEntity<String> addProductToCategory(
            @RequestParam String categoryName,
            @RequestParam Integer productId) {

        return ResponseEntity.ok(categoryService.addProductToCategory(categoryName, productId));
    }

    @PostMapping("/removeProductFromCategory")
    public ResponseEntity<String> removeProductFromCategory(
            @RequestParam String categoryName,
            @RequestParam Integer productId) {

        return ResponseEntity.ok(categoryService.removeProductFromCategory(categoryName, productId));
    }

    @GetMapping("/checkCategoryExists")
    public ResponseEntity<Boolean> checkCategoryExists(@RequestParam String categoryName) {
        return ResponseEntity.ok(categoryService.checkCategoryExists(categoryName));
    }

    @GetMapping("/getCategoryByProductId")
    public ResponseEntity<String> getCategoryByProductId(
            @RequestParam Integer productId) {

        return ResponseEntity.ok(categoryService.getCategoryByProductId(productId));
    }
}
