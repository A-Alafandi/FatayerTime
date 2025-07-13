package com.fatayertime.backend.repository;

import com.fatayertime.backend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {

    // Find single item by exact name match
    Optional<MenuItem> findByName(String name);

    // Find all items containing name (case-insensitive)
    List<MenuItem> findByNameContainingIgnoreCase(String name);

    // Find by ID is already provided by JpaRepository
    // Optional<MenuItem> findById(Long id);

    // Basic category filter
    List<MenuItem> findByCategory(String category);
}