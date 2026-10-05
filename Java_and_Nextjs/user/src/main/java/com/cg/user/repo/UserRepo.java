package com.cg.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.user.entity.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity, String> {

}
