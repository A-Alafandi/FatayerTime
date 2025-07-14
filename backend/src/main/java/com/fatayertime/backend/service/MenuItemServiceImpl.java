package com.fatayertime.backend.service;

import com.fatayertime.backend.dto.MenuItemRequestDTO;
import com.fatayertime.backend.dto.MenuItemResponseDTO;
import com.fatayertime.backend.dto.MenuItemMapper;
import com.fatayertime.backend.model.MenuItem;
import com.fatayertime.backend.repository.MenuItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemRepository menuItemRepository;

    @Override
    public List<MenuItemResponseDTO> getAll() {
        return menuItemRepository.findAll().stream()
                .map(MenuItemMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemResponseDTO getById(UUID id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));
        return MenuItemMapper.toDto(menuItem);
    }

    @Override
    public List<MenuItemResponseDTO> getVegetarian() {
        return menuItemRepository.findByIsVegetarianTrue().stream()
                .map(MenuItemMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemResponseDTO create(MenuItemRequestDTO request) {
        MenuItem saved = menuItemRepository.save(MenuItemMapper.toEntity(request));
        return MenuItemMapper.toDto(saved);
    }

    @Override
    public MenuItemResponseDTO update(UUID id, MenuItemRequestDTO request) {
        if (!menuItemRepository.existsById(id)) {
            throw new EntityNotFoundException("Menu item not found");
        }
        MenuItem entity = MenuItemMapper.toEntity(request);
        entity.setId(id);
        MenuItem saved = menuItemRepository.save(entity);
        return MenuItemMapper.toDto(saved);
    }

    @Override
    public void delete(UUID id) {
        if (!menuItemRepository.existsById(id)) {
            throw new EntityNotFoundException("Menu item not found");
        }
        menuItemRepository.deleteById(id);
    }
}
