package com.cg.user.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

// import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final String SECRET = "mySecretKeyForShopSphereProject12345678901234567890BANKAI";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String email, String role) {

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + 3600000))
                .signWith(key)
                .compact();
    }
}