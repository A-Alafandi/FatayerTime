package com.fatayertime.backend.service;

import com.fatayertime.backend.dto.MenuItemRequestDTO;
import com.fatayertime.backend.dto.MenuItemResponseDTO;
import com.fatayertime.backend.dto.MenuItemMapper;
import com.fatayertime.backend.model.MenuItem;
import com.fatayertime.backend.repository.MenuItemRepository;
import com.fatayertime.backend.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemMapper menuItemMapper;

    @Override
    public MenuItemResponseDTO createMenuItem(MenuItemRequestDTO dto) {
        MenuItem menuItem = menuItemMapper.toEntity(dto);
        MenuItem saved = menuItemRepository.save(menuItem);
        return menuItemMapper.toResponseDto(saved);
    }

    @Override
    public MenuItemResponseDTO updateMenuItem(UUID id, MenuItemRequestDTO dto) {
        MenuItem existing = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        // MapStruct won't update existing, so do it manually or with your own logic:
        existing.setName(dto.getName());
        existing.setCategory(dto.getCategory());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        existing.setImageUrl(dto.getImageUrl());
        existing.setIsVegetarian(dto.getIsVegetarian());
        existing.setIsSpicy(dto.getIsSpicy());
        existing.setIngredients(dto.getIngredients());
        MenuItem saved = menuItemRepository.save(existing);
        return menuItemMapper.toResponseDto(saved);
    }

    @Override
    public void deleteMenuItem(UUID id) {
        menuItemRepository.deleteById(id);
    }

    @Override
    public MenuItemResponseDTO getMenuItemById(UUID id) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        return menuItemMapper.toResponseDto(item);
    }

    @Override
    public List<MenuItemResponseDTO> getAllMenuItems() {
        List<MenuItem> items = menuItemRepository.findAll();
        return menuItemMapper.toResponseDtoList(items);
    }
}
