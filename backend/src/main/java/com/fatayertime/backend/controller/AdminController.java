package com.fatayertime.backend.controller;

import com.fatayertime.backend.dto.AdminUpdateRequestDTO;
import com.fatayertime.backend.dto.AdminUpdateResponseDTO;
import com.fatayertime.backend.model.AppUser;
import com.fatayertime.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Endpoint for admin to update their own username (email) and/or password.
     */
    @PutMapping("/update")
    public ResponseEntity<AdminUpdateResponseDTO> updateProfile(
            @Valid @RequestBody AdminUpdateRequestDTO request
    ) {
        // Find admin user by current username/email
        AppUser admin = userRepository.findByUsername(request.getNewUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check current password matches
        if (!passwordEncoder.matches(request.getCurrentPassword(), admin.getPassword())) {
            AdminUpdateResponseDTO resp = new AdminUpdateResponseDTO(null, "Current password is incorrect", false);
            return ResponseEntity.badRequest().body(resp);
        }

        // Check if username is changed and not already taken
        if (!admin.getUsername().equals(request.getNewUsername()) &&
                userRepository.existsByUsername(request.getNewUsername())) {
            AdminUpdateResponseDTO resp = new AdminUpdateResponseDTO(null, "Username/email is already in use", false);
            return ResponseEntity.badRequest().body(resp);
        }

        // Update username (email) if changed
        admin.setUsername(request.getNewUsername());

        // Update password if provided (and not blank)
        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        userRepository.save(admin);

        AdminUpdateResponseDTO resp = new AdminUpdateResponseDTO(admin.getUsername(), "Profile updated successfully", true);
        return ResponseEntity.ok(resp);
    }
}
