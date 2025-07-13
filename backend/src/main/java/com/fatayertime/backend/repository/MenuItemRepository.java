package com.fatayertime.backend.repository;

import com.fatayertime.backend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {


    Optional<MenuItem> findByName(String name);
    List<MenuItem> findByNameContainingIgnoreCase(String name);
    List<MenuItem> findByCategory(String category);
}