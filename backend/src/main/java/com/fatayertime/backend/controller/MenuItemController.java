package com.fatayertime.backend.controller;

import com.fatayertime.backend.dto.MenuItemRequestDTO;
import com.fatayertime.backend.dto.MenuItemResponseDTO;
import com.fatayertime.backend.service.MenuItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @GetMapping
    public List<MenuItemResponseDTO> getAllMenuItems() {
        return menuItemService.getAll();
    }


    // ---- ADMIN-ONLY ENDPOINTS ----
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<MenuItemResponseDTO> getMenuItemById(@PathVariable UUID id) {
        return ResponseEntity.ok(menuItemService.getById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public List<MenuItemResponseDTO> getAllMenuItemsForAdminPage() {
        return menuItemService.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/vegetarian")
    public List<MenuItemResponseDTO> getVegetarianMenuItems() {
        return menuItemService.getVegetarian();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MenuItemResponseDTO> createMenuItem(@Valid @RequestBody MenuItemRequestDTO dto) {
        MenuItemResponseDTO saved = menuItemService.create(dto);
        return ResponseEntity.created(URI.create("/api/menu/" + saved.getId())).body(saved);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<MenuItemResponseDTO> updateMenuItem(
            @PathVariable UUID id,
            @Valid @RequestBody MenuItemRequestDTO dto
    ) {
        MenuItemResponseDTO updated = menuItemService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable UUID id) {
        menuItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
