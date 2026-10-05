package com.cg.user.service;

import com.cg.user.dto.UserResponse;
import com.cg.user.entity.UserEntity;

public interface UserService {
    public String addUser(UserEntity user);
    public UserResponse getUserByEmail(String email);
    public String updateUserPassword(String email, String newPassword);
    public String deleteUserByEmail(String email);
    public String addToCart(String email, Integer productId);
    public UserEntity getUserByEmailForPassword(String email);
    public String removeFromCart(String email, Integer productId);
    public String updateUserName(String email, String newName);
    public String clearCart(String email);
    public UserEntity authenticateUser(String email, String password);

}
