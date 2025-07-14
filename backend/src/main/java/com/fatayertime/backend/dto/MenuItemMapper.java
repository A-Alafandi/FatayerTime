package com.fatayertime.backend.dto;

import com.fatayertime.backend.model.MenuItem;

public class MenuItemMapper {

    public static MenuItemResponseDTO toDto(MenuItem entity) {
        if (entity == null) return null;
        return MenuItemResponseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice().doubleValue())
                .category(entity.getCategory())
                .imageUrl(entity.getImageUrl())
                .ingredients(entity.getIngredients())
                .isVegetarian(entity.isVegetarian())
                .build();
    }

    public static MenuItem toEntity(MenuItemRequestDTO dto) {
        if (dto == null) return null;
        return MenuItem.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(java.math.BigDecimal.valueOf(dto.getPrice()))
                .category(dto.getCategory())
                .imageUrl(dto.getImageUrl())
                .ingredients(dto.getIngredients())
                .isVegetarian(dto.isVegetarian())
                .build();
    }
}
