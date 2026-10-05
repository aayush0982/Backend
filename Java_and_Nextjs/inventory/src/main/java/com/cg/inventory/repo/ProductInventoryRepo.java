package com.cg.inventory.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.inventory.entity.ProductInventory;

public interface ProductInventoryRepo extends JpaRepository<ProductInventory, Integer> {

}
