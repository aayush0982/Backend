package com.cg.category.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.category.entity.Category;
import com.cg.category.modal.product;

public interface categoryRepo extends JpaRepository<Category, Integer> {

    List<product> findAllProductsByCategoryName(String categoryName);

    List<Integer> findAllCategoryIdsByCategoryName(String categoryName);

    Optional<Category> findByCategoryName(String categoryName);

    boolean existsByCategoryName(String categoryName);
    
}
