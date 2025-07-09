package com.fatayertime.backend.service;

import com.fatayertime.backend.model.AppUser;
import com.fatayertime.backend.repository.UserRepository;
import com.fatayertime.backend.request.AdminUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public void updateAdminAccount(AdminUpdateRequest request, String username) {
        AppUser admin = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), admin.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        if (!admin.getUsername().equals(request.getNewUsername()) &&
                userRepo.existsByUsername(request.getNewUsername())) {
            throw new RuntimeException("Username already in use");
        }

        admin.setUsername(request.getNewUsername());
        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        userRepo.save(admin);
    }
}