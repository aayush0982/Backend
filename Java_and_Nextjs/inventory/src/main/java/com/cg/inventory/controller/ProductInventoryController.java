package com.cg.inventory.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.inventory.service.ProductInventorySerImpl;

@RestController
@RequestMapping("/productinventory")
public class ProductInventoryController {

    private final ProductInventorySerImpl productInventoryService;

    public ProductInventoryController(ProductInventorySerImpl productInventoryService) {
        this.productInventoryService = productInventoryService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProductInventory(@RequestParam Integer productId, @RequestParam Integer productQuantity) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productInventoryService.addProductInventory(productId, productQuantity));
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateProductInventory(@RequestParam Integer productId, @RequestParam Integer productQuantity) {
        return ResponseEntity.ok(productInventoryService.updateProductInventory(productId, productQuantity));
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteProductInventory(@RequestParam Integer productId) {
        return ResponseEntity.ok(productInventoryService.deleteProductInventory(productId));
    }

    @GetMapping("/getByProductId")
    public ResponseEntity<Integer> getProductInventory(@RequestParam Integer productId) {
        return ResponseEntity.ok(productInventoryService.getProductInventory(productId));
    }
}
