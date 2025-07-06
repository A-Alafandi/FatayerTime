package com.fatayertime.backend.Controller;

import com.fatayertime.backend.Model.MenuItem;
import com.fatayertime.backend.Service.MenuItemService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    // Public access (anyone can see the menu)
    @GetMapping
    public List<MenuItem> getMenu() {
        System.out.println("GET /api/menu called");
        return menuItemService.getAllMenuItems();
    }

    // Admin only: Add a menu item
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public MenuItem addMenuItem(@RequestBody MenuItem item) {
        return menuItemService.addMenuItem(item);
    }

    // Admin only: Delete a menu item
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
    }

    // Admin only: Update a menu item
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public MenuItem updateMenuItem(@PathVariable Long id, @RequestBody MenuItem item) {
        return menuItemService.updateMenuItem(id, item);
    }
}