package com.fatayertime.backend.dto;

import com.fatayertime.backend.model.MenuItem;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MenuItemMapper {
    MenuItemMapper INSTANCE = Mappers.getMapper(MenuItemMapper.class);

    // Map from DTO (request) to entity
    MenuItem toEntity(MenuItemRequestDTO dto);

    // Map from entity to DTO (response)
    MenuItemResponseDTO toResponseDto(MenuItem entity);

    // Map list of entities to list of response DTOs
    List<MenuItemResponseDTO> toResponseDtoList(List<MenuItem> entities);
}
