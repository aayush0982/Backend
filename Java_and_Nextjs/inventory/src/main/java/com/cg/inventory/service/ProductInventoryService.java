package com.cg.inventory.service;

public interface ProductInventoryService {
    public String updateProductInventory(Integer productId, Integer productQuantity);
    public String addProductInventory(Integer productId, Integer productQuantity);
    public String deleteProductInventory(Integer productId);
    public Integer getProductInventory(Integer productId);
}
