package com.fatayertime.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "menu_item")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String category;

    @Column(length = 5000) // or even @Lob if needed
    private String description;

    private Double price;

    @Column(length = 1000)
    private String imageUrl;

    private Boolean isVegetarian;

    private Boolean isSpicy;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "menu_item_ingredients",
            joinColumns = @JoinColumn(name = "menu_item_id")
    )
    @Column(name = "ingredient")
    private List<String> ingredients;
}
