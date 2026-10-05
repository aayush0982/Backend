package com.cg.user.dto;

import java.util.List;

public class UserResponse {
    private String userEmail;
    private String userName;
    private String userRole;
    private List<Integer> cart;

    public UserResponse(String userEmail, String userName,String userRole, List<Integer> cart) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.userRole = userRole;
        this.cart = cart;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<Integer> getCart() {
        return cart;
    }

    public void setCart(List<Integer> cart) {
        this.cart = cart;
    }

    @Override
    public String toString() {
        return "UserResponse{" +
                "userEmail='" + userEmail + '\'' +
                ", userName='" + userName + '\'' +
                ", userRole='" + userRole + '\'' +
                ", cart=" + cart +
                '}';
    }
}
