package com.cg.productcatalogue.modal;

import java.util.List;

import jakarta.persistence.ElementCollection;


public class Category {
    private Integer categoryId;
    private String categoryName;
    @ElementCollection
    private List<Integer> productId;

    public Category() {
    }

    public Category(Integer categoryId, String categoryName, List<Integer> productId) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.productId = productId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Integer> getProductId() {
        return productId;
    }

    public void setProductId(List<Integer> productId) {
        this.productId = productId;
    }

    @Override
    public String toString() {
        return "category [categoryId=" + categoryId + ", categoryName=" + categoryName + ", productId=" + productId
                + "]";
    }
}
