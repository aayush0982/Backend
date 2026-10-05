package com.cg.inventory.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ProductInventory {
    @Id
    private Integer productId;
    private Integer productQuantity;

    public ProductInventory() {
    }

    public ProductInventory(Integer productId, Integer productQuantity) {
        this.productId = productId;
        this.productQuantity = productQuantity;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(Integer productQuantity) {
        this.productQuantity = productQuantity;
    }

    @Override
    public String toString() {
        return "inventory{" +
                "productId=" + productId +
                ", productQuantity=" + productQuantity +
                '}';
    }
}
