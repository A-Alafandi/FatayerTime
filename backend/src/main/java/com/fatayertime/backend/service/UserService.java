package com.fatayertime.backend.service;

import com.fatayertime.backend.model.AppUser;
import com.fatayertime.backend.repository.UserRepository;
import com.fatayertime.backend.dto.AdminUpdateRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public void updateAdminAccount(AdminUpdateRequestDTO request, String username) {
        AppUser admin = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), admin.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // ✅ Only check for username conflict if user is changing it
        String newUsername = request.getNewUsername();
        if (newUsername != null && !newUsername.equals(admin.getUsername())) {
            if (userRepo.existsByUsername(newUsername)) {
                throw new RuntimeException("Username already in use");
            }
            admin.setUsername(newUsername); // ✅ set new username
        }

        // ✅ Update password if provided
        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        userRepo.save(admin);
    }
}
