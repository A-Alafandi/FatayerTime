package com.fatayertime.backend.service;

import com.fatayertime.backend.dto.MenuItemRequestDTO;
import com.fatayertime.backend.dto.MenuItemResponseDTO;

import java.util.List;
import java.util.UUID;

public interface MenuItemService {
    List<MenuItemResponseDTO> getAll();
    MenuItemResponseDTO getById(UUID id);
    List<MenuItemResponseDTO> getVegetarian();
    MenuItemResponseDTO create(MenuItemRequestDTO request);
    MenuItemResponseDTO update(UUID id, MenuItemRequestDTO request);
    void delete(UUID id);
}
