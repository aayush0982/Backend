package com.cg.category.service;

import java.util.ArrayList;
import java.util.List;

import com.cg.category.exception.CategoryNotFoundException;
import com.cg.category.exception.ProductNotFoundInCategoryException;

import org.springframework.stereotype.Service;

import com.cg.category.entity.Category;
import com.cg.category.modal.product;
import com.cg.category.repo.categoryRepo;

@Service
public class categorySerImpl implements categoryService {

    private final categoryRepo categoryRepo;

    public categorySerImpl(categoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    @Override
    public String addCategory(Category category) {
        categoryRepo.save(category);
        return "Category added successfully";
    }

    @Override
    public List<product> getAllProductsByCategoryName(String categoryName) {
        return categoryRepo.findAllProductsByCategoryName(categoryName);
    }

    @Override
    public List<Integer> getProductIdsByCategoryName(String categoryName) {

        Category c = categoryRepo.findByCategoryName(categoryName)
                .orElseThrow(() -> new CategoryNotFoundException(categoryName));

        return c.getProductId();
    }

    @Override
    public String addProductToCategory(String categoryName, Integer productId) {

        Category c = categoryRepo.findByCategoryName(categoryName)
                .orElseThrow(() -> new CategoryNotFoundException(categoryName));

        if (c.getProductId() == null) {
            c.setProductId(new ArrayList<>());
        }

        c.getProductId().add(productId);

        categoryRepo.save(c);

        return "Product added to category successfully";
    }

    @Override
    public String removeProductFromCategory(String categoryName, Integer productId) {
        Category c = categoryRepo.findByCategoryName(categoryName)
                .orElseThrow(() -> new CategoryNotFoundException(categoryName));

        if (c.getProductId() == null || !c.getProductId().contains(productId)) {
            throw new ProductNotFoundInCategoryException(productId, categoryName);
        }

        c.getProductId().remove(productId);

        categoryRepo.save(c);

        return "Product removed from category successfully";
    }

    @Override
    public boolean checkCategoryExists(String categoryName) {
        return categoryRepo.existsByCategoryName(categoryName);
    }

    @Override
    public String getCategoryByProductId(Integer productId) {

        List<Category> categories = categoryRepo.findAll();

        for (Category category : categories) {

            if (category.getProductId() != null
                    && category.getProductId().contains(productId)) {

                return category.getCategoryName();
            }
        }

        throw new ProductNotFoundInCategoryException(productId, "any category");
    }
}
