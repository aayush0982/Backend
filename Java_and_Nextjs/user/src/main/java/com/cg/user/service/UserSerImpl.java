package com.cg.user.service;

import org.springframework.stereotype.Service;

import com.cg.user.dto.UserResponse;
import com.cg.user.entity.UserEntity;
import com.cg.user.exception.UserAlreadyExistsException;
import com.cg.user.exception.UserNotFoundException;
import com.cg.user.repo.UserRepo;
import com.cg.user.util.PasswordUtil;

@Service
public class UserSerImpl implements UserService {

    private final UserRepo userRepo;

    public UserSerImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public String addUser(UserEntity user) {
        if (userRepo.existsById(user.getUserEmail())) {
            throw new UserAlreadyExistsException(user.getUserEmail());
        }
        String password = user.getUserPassword();
        String hashedPassword = PasswordUtil.hashPassword(password);
        user.setUserPassword(hashedPassword);
        userRepo.save(user);
        return "User added successfully";
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        UserEntity user = getUserByEmailForPassword(email);
        return new UserResponse(user.getUserEmail(), user.getUserName(), user.getUserRole(), user.getCart());
    }

    @Override
    public UserEntity getUserByEmailForPassword(String email) {
        return userRepo.findById(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }

    @Override
    public String updateUserPassword(String email, String newPassword) {
        UserEntity user = getUserByEmailForPassword(email);
        String hashedPassword = PasswordUtil.hashPassword(newPassword);
        user.setUserPassword(hashedPassword);
        userRepo.save(user);
        return "Password updated successfully";
    }

    @Override
    public String deleteUserByEmail(String email) {
        UserEntity user = getUserByEmailForPassword(email);
        userRepo.delete(user);
        return "User deleted successfully";
    }

    // @Override
    // public String addToCart(String email, Integer productId) {
    // UserEntity user = getUserByEmailForPassword(email);
    // user.getCart().add(productId);
    // userRepo.save(user);
    // return "Product added to cart successfully";
    // }
    @Override
    public String addToCart(String email, Integer productId) {

        UserEntity user = getUserByEmailForPassword(email);

        if (user.getCart().contains(productId)) {
            return "Product is already in cart";
        }

        user.getCart().add(productId);

        userRepo.save(user);

        return "Product added to cart successfully";
    }

    @Override
    public String removeFromCart(String email, Integer productId) {
        UserEntity user = getUserByEmailForPassword(email);
        user.getCart().remove(productId);
        userRepo.save(user);
        return "Product removed from cart successfully";
    }

    @Override
    public String updateUserName(String email, String newName) {
        UserEntity user = getUserByEmailForPassword(email);
        user.setUserName(newName);
        userRepo.save(user);
        return "Name updated successfully";
    }

    @Override
    public String clearCart(String email) {
        UserEntity user = getUserByEmailForPassword(email);
        user.getCart().clear();
        userRepo.save(user);
        return "Cart cleared successfully";
    }

    @Override
    public UserEntity authenticateUser(String email, String password) {

        UserEntity user = getUserByEmailForPassword(email);

        String hashPassword = user.getUserPassword();

        if (PasswordUtil.verifyPassword(password, hashPassword)) {
            return user;
        }

        return null;
    }
}
