package com.fatayertime.backend.repository;

import com.fatayertime.backend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {
    // Example custom query: find all vegetarian items
    List<MenuItem> findByIsVegetarianTrue();

    // Add more queries as needed (e.g., by category)
    List<MenuItem> findByCategory(String category);

    // Optional: search by name
    List<MenuItem> findByNameContainingIgnoreCase(String name);
}