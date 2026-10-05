package com.cg.user.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.user.dto.UserResponse;
import com.cg.user.entity.UserEntity;
import com.cg.user.security.JwtService;
import com.cg.user.service.UserSerImpl;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserSerImpl userService;
    private final JwtService jwtService;

    public UserController(
            UserSerImpl userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestParam String email, @RequestParam String password,
            @RequestParam String userRole) {
        UserEntity user = new UserEntity(email, null, password, userRole, new ArrayList<>());
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(user));
    }

    @GetMapping("/getUserByEmail")
    public ResponseEntity<UserResponse> getUserByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PostMapping("/updateUserPassword")
    public ResponseEntity<String> updateUserPassword(@RequestParam String email, @RequestParam String newPassword) {
        return ResponseEntity.ok(userService.updateUserPassword(email, newPassword));
    }

    @GetMapping("/deleteUserByEmail")
    public ResponseEntity<String> deleteUserByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.deleteUserByEmail(email));
    }

    @PostMapping("/addToCart")
    public ResponseEntity<String> addToCart(@RequestParam String email, @RequestParam Integer productId) {
        return ResponseEntity.ok(userService.addToCart(email, productId));
    }

    @PostMapping("/removeFromCart")
    public ResponseEntity<String> removeFromCart(@RequestParam String email, @RequestParam Integer productId) {
        return ResponseEntity.ok(userService.removeFromCart(email, productId));
    }

    @PostMapping("/updateUserName")
    public ResponseEntity<String> updateUserName(@RequestParam String email, @RequestParam String newName) {
        return ResponseEntity.ok(userService.updateUserName(email, newName));
    }

    @PostMapping("/clearCart")
    public ResponseEntity<String> clearCart(@RequestParam String email) {
        return ResponseEntity.ok(userService.clearCart(email));
    }

    @PostMapping("/authenticateUser")
    public ResponseEntity<String> authenticateUser(
            @RequestParam String email,
            @RequestParam String password) {

        UserEntity user = userService.authenticateUser(email, password);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getUserEmail(),
                user.getUserRole());

        return ResponseEntity.ok(token);
    }

}
