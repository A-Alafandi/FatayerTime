package com.fatayertime.backend.controller;

import com.fatayertime.backend.model.MenuItem;
import com.fatayertime.backend.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemRepository repository;

    @GetMapping("/all")
    public List<MenuItem> getAllItems() {
        return repository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<MenuItem> getByCategory(@PathVariable String category) {
        return repository.findByCategory(category);
    }
}