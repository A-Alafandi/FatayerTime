package com.fatayertime.backend.Controller;

import com.fatayertime.backend.Model.MenuItem;
import com.fatayertime.backend.Repository.MenuItemRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuItemController {

    private final MenuItemRepository repository;

    public MenuItemController(MenuItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MenuItem> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public MenuItem create(@RequestBody MenuItem item) {
        return repository.save(item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
    @PutMapping("/{id}")
    public MenuItem update(@PathVariable Long id, @RequestBody MenuItem updatedItem) {
        return repository.findById(id)
                .map(existingItem -> {
                    existingItem.setName(updatedItem.getName());
                    existingItem.setPrice(updatedItem.getPrice());
                    existingItem.setImageUrl(updatedItem.getImageUrl());
                    existingItem.setIngredients(updatedItem.getIngredients());
                    existingItem.setDescription(updatedItem.getDescription());
                    return repository.save(existingItem);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
    }
}
