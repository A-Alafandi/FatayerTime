package com.fatayertime.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Size(max = 512)
    @Column(nullable = false)
    private String description;

    @NotNull
    @DecimalMin("0.0")
    @Column(nullable = false)
    private BigDecimal price;

    @NotBlank
    @Column(nullable = false)
    private String category;

    @NotBlank
    @Column(nullable = false)
    private String imageUrl;

    @NotBlank
    @Column(nullable = false)
    private String ingredients;

    @Column(nullable = false)
    private boolean isVegetarian;
}
