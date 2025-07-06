package com.fatayertime.backend.Service;

import com.fatayertime.backend.Model.MenuItem;
import com.fatayertime.backend.Repository.MenuItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @Transactional
    public MenuItem addMenuItem(MenuItem item) {
        return menuItemRepository.save(item);
    }

    @Transactional
    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }

    @Transactional
    public MenuItem updateMenuItem(Long id, MenuItem updatedItem) {
        Optional<MenuItem> optionalItem = menuItemRepository.findById(id);
        if (optionalItem.isPresent()) {
            MenuItem existingItem = optionalItem.get();
            existingItem.setName(updatedItem.getName());
            existingItem.setDescription(updatedItem.getDescription());
            existingItem.setIngredients(updatedItem.getIngredients());
            existingItem.setImageUrl(updatedItem.getImageUrl());
            existingItem.setCategory(updatedItem.getCategory());
            existingItem.setPrice(updatedItem.getPrice());
            return menuItemRepository.save(existingItem);
        } else {
            throw new RuntimeException("Menu item with ID " + id + " not found.");
        }
    }
}
