package com.fatayertime.backend.Repository;

import com.fatayertime.backend.Model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}