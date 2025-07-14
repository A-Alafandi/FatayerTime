package com.fatayertime.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    @Size(max = 512)
    private String description;

    @NotNull
    @DecimalMin("0.0")
    private Double price;

    @NotBlank
    private String category;

    @NotBlank
    private String imageUrl;

    @NotBlank
    private String ingredients;

    private boolean isVegetarian;
}
