package com.fatayertime.backend.controller;

import com.fatayertime.backend.config.JwtUtil;
import com.fatayertime.backend.dto.LoginRequestDTO;
import com.fatayertime.backend.dto.LoginResponseDTO;
import com.fatayertime.backend.model.AppUser;
import com.fatayertime.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return userRepository.findByUsername(request.getUsername())
                .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> {
                    String accessToken = jwtUtil.generateToken(
                            org.springframework.security.core.userdetails.User
                                    .withUsername(user.getUsername())
                                    .password(user.getPassword())
                                    .roles(user.getRole())
                                    .build());
                    LoginResponseDTO response = LoginResponseDTO.builder()
                            .accessToken(accessToken)
                            .tokenType("Bearer")
                            .username(user.getUsername())
                            .role(user.getRole())
                            .error(null)
                            .build();
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    LoginResponseDTO errorResponse = LoginResponseDTO.builder()
                            .accessToken(null)
                            .tokenType(null)
                            .username(null)
                            .role(null)
                            .error("Invalid username or password")
                            .build();
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
                });
    }
}
