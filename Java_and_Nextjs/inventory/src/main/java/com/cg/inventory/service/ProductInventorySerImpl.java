package com.cg.inventory.service;

import org.springframework.stereotype.Service;

import com.cg.inventory.entity.ProductInventory;
import com.cg.inventory.exception.InsufficientInventoryException;
import com.cg.inventory.exception.ProductInventoryAlreadyExistsException;
import com.cg.inventory.exception.ProductInventoryNotFoundException;
import com.cg.inventory.repo.ProductInventoryRepo;

@Service
public class ProductInventorySerImpl implements ProductInventoryService {

    private final ProductInventoryRepo productInventoryRepo;

    public ProductInventorySerImpl(ProductInventoryRepo productInventoryRepo) {
        this.productInventoryRepo = productInventoryRepo;
    }

    @Override
    public String updateProductInventory(Integer productId, Integer productQuantity) {
        validateProductId(productId);
        if (productQuantity == null) {
            throw new IllegalArgumentException("Product quantity is required");
        }

        ProductInventory productInventory = productInventoryRepo.findById(productId)
                .orElseThrow(() -> new ProductInventoryNotFoundException(productId));

        if (productQuantity < 0 && productInventory.getProductQuantity() + productQuantity < 0) {
            throw new InsufficientInventoryException(productId);
        }

        productInventory.setProductQuantity(productInventory.getProductQuantity() + productQuantity);
        productInventoryRepo.save(productInventory);
        return "Product inventory updated successfully";
    }

    @Override
    public String addProductInventory(Integer productId, Integer productQuantity) {
        validateProductId(productId);
        if (productQuantity == null || productQuantity < 0) {
            throw new IllegalArgumentException("Product quantity must be zero or greater");
        }
        if (productInventoryRepo.existsById(productId)) {
            throw new ProductInventoryAlreadyExistsException(productId);
        }

        ProductInventory productInventory = new ProductInventory();
        productInventory.setProductId(productId);
        productInventory.setProductQuantity(productQuantity);
        productInventoryRepo.save(productInventory);
        return "Product inventory added successfully";
    }

    @Override
    public String deleteProductInventory(Integer productId) {
        validateProductId(productId);
        ProductInventory productInventory = productInventoryRepo.findById(productId)
                .orElseThrow(() -> new ProductInventoryNotFoundException(productId));
        productInventoryRepo.delete(productInventory);
        return "Product inventory deleted successfully";
    }

    @Override
    public Integer getProductInventory(Integer productId) {
        validateProductId(productId);
        return productInventoryRepo.findById(productId)
                .map(ProductInventory::getProductQuantity)
                .orElseThrow(() -> new ProductInventoryNotFoundException(productId));
    }

    private void validateProductId(Integer productId) {
        if (productId == null || productId <= 0) {
            throw new IllegalArgumentException("Product ID must be greater than zero");
        }
    }

}
