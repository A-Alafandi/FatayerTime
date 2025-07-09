package com.fatayertime.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false, nullable = false)
    private UUID id;

    private String name;
    private String description;
    private double price;
    private String category;
    private String imageUrl;
    private String ingredients;

    private boolean isVegetarian;

    public MenuItem(String cheeseFatayer, String meltedCheeseWrappedInDough, String s, String fatayer, String fatayerImg, int i, boolean b) {
    }
}
