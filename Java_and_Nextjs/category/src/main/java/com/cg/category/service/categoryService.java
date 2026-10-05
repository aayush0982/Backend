package com.cg.category.service;

import java.util.List;

import com.cg.category.entity.Category;
import com.cg.category.modal.product;

public interface categoryService {
    public String addCategory(Category category);

    public List<product> getAllProductsByCategoryName(String categoryName);

    public List<Integer> getProductIdsByCategoryName(String categoryName);

    public String addProductToCategory(String categoryName, Integer productId);

    public String removeProductFromCategory(String categoryName, Integer productId);

    public boolean checkCategoryExists(String categoryName);

    public String getCategoryByProductId(Integer productId);

}
