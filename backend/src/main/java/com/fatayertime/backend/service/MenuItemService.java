package com.fatayertime.backend.service;

import com.fatayertime.backend.model.MenuItem;
import com.fatayertime.backend.repository.MenuItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    // Create
    @Transactional
    public MenuItem createMenuItem(MenuItem menuItem) {
        log.info("Creating new menu item: {}", menuItem.getName());
        return menuItemRepository.save(menuItem);
    }

    // Read
    @Transactional(readOnly = true)
    public MenuItem getMenuItemById(UUID id) {
        log.debug("Fetching menu item with id: {}", id);
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<MenuItem> getAllMenuItems() {
        log.debug("Fetching all menu items");
        return menuItemRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<MenuItem> getMenuItemsByCategory(String category) {
        log.debug("Fetching menu items for category: {}", category);
        return menuItemRepository.findByCategory(category);
    }

    // Update
    @Transactional
    public MenuItem updateMenuItem(UUID id, MenuItem updatedItem) {
        log.info("Updating menu item with id: {}", id);
        MenuItem existingItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found with id: " + id));

        if (updatedItem.getName() != null && !updatedItem.getName().equals(existingItem.getName())) {
            existingItem.setName(updatedItem.getName());
        }
        if (updatedItem.getDescription() != null) {
            existingItem.setDescription(updatedItem.getDescription());
        }
        if (updatedItem.getIngredients() != null) {
            existingItem.setIngredients(updatedItem.getIngredients());
        }
        if (updatedItem.getCategory() != null) {
            existingItem.setCategory(updatedItem.getCategory());
        }
        if (updatedItem.getImageUrl() != null) {
            existingItem.setImageUrl(updatedItem.getImageUrl());
        }
        if (updatedItem.getPrice() != 0 && updatedItem.getPrice() != existingItem.getPrice()) {
            existingItem.setPrice(updatedItem.getPrice());
        }
        if (updatedItem.isVegetarian() != existingItem.isVegetarian()) {
            existingItem.setVegetarian(updatedItem.isVegetarian());
        }

        return menuItemRepository.save(existingItem);
    }

    // Delete
    @Transactional
    public void deleteMenuItem(UUID id) {
        log.info("Deleting menu item with id: {}", id);
        if (!menuItemRepository.existsById(id)) {
            throw new EntityNotFoundException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    // Additional useful methods
    @Transactional(readOnly = true)
    public boolean existsByName(String name) {
        return menuItemRepository.findByName(name).isPresent();
    }

    @Transactional(readOnly = true)
    public List<MenuItem> searchMenuItems(String query) {
        return menuItemRepository.findByNameContainingIgnoreCase(query);
    }
}