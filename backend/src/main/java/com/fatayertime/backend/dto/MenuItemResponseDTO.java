package com.fatayertime.backend.dto;

import lombok.*;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemResponseDTO {

    private UUID id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;
    private String ingredients;
    private boolean isVegetarian;
}
