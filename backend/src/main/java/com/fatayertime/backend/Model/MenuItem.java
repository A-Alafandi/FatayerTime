package com.fatayertime.backend.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String ingredients;
    private String category;
    private String imageUrl;
    private long price;
    private boolean vegetarian;


    public MenuItem(String name, String description, String ingredients, String category, String imageUrl, long price) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.category = category;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}
