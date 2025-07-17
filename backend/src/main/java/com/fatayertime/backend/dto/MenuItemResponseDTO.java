package com.fatayertime.backend.dto;

import lombok.*;

import java.util.UUID;

import lombok.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemResponseDTO {
    private UUID id;
    private String name;
    private String category;
    private String description;
    private Double price;
    private String imageUrl;
    private Boolean isVegetarian;
    private Boolean isSpicy;
    private List<String> ingredients;
}
