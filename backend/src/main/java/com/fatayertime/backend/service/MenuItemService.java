package com.fatayertime.backend.service;

import com.fatayertime.backend.dto.MenuItemRequestDTO;
import com.fatayertime.backend.dto.MenuItemResponseDTO;

import java.util.List;
import java.util.UUID;

public interface MenuItemService {
    MenuItemResponseDTO createMenuItem(MenuItemRequestDTO dto);
    MenuItemResponseDTO updateMenuItem(UUID id, MenuItemRequestDTO dto);
    void deleteMenuItem(UUID id);
    MenuItemResponseDTO getMenuItemById(UUID id);
    List<MenuItemResponseDTO> getAllMenuItems();
}