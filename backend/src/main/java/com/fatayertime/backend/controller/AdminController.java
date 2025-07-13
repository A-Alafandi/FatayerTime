package com.fatayertime.backend.controller;

import com.fatayertime.backend.model.MenuItem;
import com.fatayertime.backend.request.AdminUpdateRequest;
import com.fatayertime.backend.repository.MenuItemRepository;
import com.fatayertime.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final MenuItemRepository menuRepo;

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody @Valid AdminUpdateRequest request,
                                           @AuthenticationPrincipal UserDetails principal) {
        userService.updateAdminAccount(request, principal.getUsername());
        return ResponseEntity.ok("✅ Profile updated");
    }

    // ✅ Get all menu items
    @GetMapping("/menu")
    public List<MenuItem> getAllMenuItems() {
        return menuRepo.findAll();
    }

    // ✅ Create new menu item
    @PostMapping("/menu")
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem item) {
        return ResponseEntity.ok(menuRepo.save(item));
    }

    // ✅ Update menu item
    @PutMapping("/menu/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable UUID id, @RequestBody MenuItem updatedItem) {
        return menuRepo.findById(id)
                .map(item -> {
                    item.setName(updatedItem.getName());
                    item.setPrice(updatedItem.getPrice());
                    item.setImageUrl(updatedItem.getImageUrl());
                    item.setDescription(updatedItem.getDescription());
                    item.setIngredients(updatedItem.getIngredients());
                    item.setCategory(updatedItem.getCategory());
                    return ResponseEntity.ok(menuRepo.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete menu item
    @DeleteMapping("/menu/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable UUID id) {
        if (menuRepo.existsById(id)) {
            menuRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
