package com.fatayertime.backend.Controller;

import com.fatayertime.backend.Model.AppUser;
import com.fatayertime.backend.Repository.UserRepository;
import com.fatayertime.backend.Request.AdminUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Admin profile management endpoints.
 *
 *  PUT /api/admin/update – change e-mail and / or password
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository   userRepository;
    private final PasswordEncoder  passwordEncoder;



    @PutMapping("/update")
    public ResponseEntity<String> updateAdminProfile(
            @Valid @RequestBody AdminUpdateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {


        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized");
        }

        String currentUsername = userDetails.getUsername();
        Optional<AppUser> optionalAdmin = userRepository.findByUsername(currentUsername);

        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Admin not found");
        }

        AppUser admin = optionalAdmin.get();


        if (!passwordEncoder.matches(request.getCurrentPassword(), admin.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Current password is incorrect");
        }


        if (request.getNewUsername() != null && !request.getNewUsername().isBlank()) {
            admin.setUsername(request.getNewUsername());
        }

        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        userRepository.save(admin);

        return ResponseEntity.ok("Admin profile updated successfully");
    }
}
