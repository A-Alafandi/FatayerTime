package com.fatayertime.backend.controller;

import com.fatayertime.backend.config.JwtUtil;
import com.fatayertime.backend.request.LoginRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest authRequest) {
        try {
            log.info("Login attempt for username: {}", authRequest.getUsername());

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()
                    )
            );

            final String token = jwtUtil.generateToken(authRequest.getUsername());

            log.info("Login successful for username: {}", authRequest.getUsername());

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .body(Map.of(
                            "token", token,
                            "message", "Login successful"
                    ));
        } catch (BadCredentialsException e) {
            log.warn("Login failed for username: {} - Invalid credentials", authRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        } catch (AuthenticationException e) {
            log.warn("Login failed for username: {} - Authentication error: {}",
                    authRequest.getUsername(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication failed"));
        } catch (Exception e) {
            log.error("Unexpected error during login for username: {}",
                    authRequest.getUsername(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        log.info("User logout requested");
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, createExpiredCookie("token").toString())
                .body(Map.of("message", "Logout successful"));
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestParam String username) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                log.warn("Token validation failed - Invalid authorization header format");
                return ResponseEntity.badRequest().body("Invalid authorization header");
            }

            String token = authHeader.substring(7);
            boolean isValid = jwtUtil.validateToken(token, username);

            if (isValid) {
                log.debug("Token validation successful for username: {}", username);
            } else {
                log.warn("Token validation failed for username: {}", username);
            }

            return ResponseEntity.ok(Map.of("valid", isValid));
        } catch (Exception e) {
            log.error("Token validation error for username: {}", username, e);
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Token validation failed"));
        }
    }

    private ResponseCookie createExpiredCookie(String name) {
        return ResponseCookie.from(name, "")
                .httpOnly(true)
                .secure(false) // Set to true in production with HTTPS
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
    }
}
