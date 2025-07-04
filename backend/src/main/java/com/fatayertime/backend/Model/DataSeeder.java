package com.fatayertime.backend.Model;


import com.fatayertime.backend.Repository.MenuItemRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder {

    private final MenuItemRepository repository;

    public DataSeeder(MenuItemRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seed() {
        if (repository.count() > 0) return;


    String fatayerImg = "https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1";

    List<MenuItem> items = List.of(
            // Fatayer
            new MenuItem("Cheese Fatayer", "Melted cheese wrapped in dough", "Cheese, dough", "Fatayer", fatayerImg, 5),
            new MenuItem("Spinach Fatayer", "Spinach with lemon and onion", "Spinach, onion, lemon", "Fatayer", fatayerImg, 5),
            new MenuItem("Zaatar Fatayer", "Thyme and olive oil", "Zaatar, olive oil", "Fatayer", fatayerImg, 4),
            new MenuItem("Meat Fatayer", "Minced beef with spices", "Beef, onion, spices", "Fatayer", fatayerImg, 6),
            new MenuItem("Potato Fatayer", "Mashed potato with herbs", "Potato, herbs", "Fatayer", fatayerImg, 5),
            new MenuItem("Labneh Fatayer", "Labneh and mint", "Labneh, mint", "Fatayer", fatayerImg, 5),
            new MenuItem("Chicken Fatayer", "Chicken with cheese", "Chicken, cheese", "Fatayer", fatayerImg, 6),
            new MenuItem("Hotdog Fatayer", "Hotdog in pastry", "Hotdog, dough", "Fatayer", fatayerImg, 4),
            new MenuItem("Mushroom Fatayer", "Mushroom and cheese", "Mushroom, cheese", "Fatayer", fatayerImg, 5),
            new MenuItem("Mixed Veg Fatayer", "Seasonal vegetables", "Zucchini, pepper, onion", "Fatayer", fatayerImg, 5),

            // Drinks
            new MenuItem("Coca-Cola", "Chilled 330ml can", "Carbonated drink", "Drinks", "https://via.placeholder.com/100", 2),
            new MenuItem("Fanta Orange", "Orange flavored soda", "Carbonated drink", "Drinks", "https://via.placeholder.com/100", 2),
            new MenuItem("Sprite", "Lemon-lime soda", "Carbonated drink", "Drinks", "https://via.placeholder.com/100", 2),
            new MenuItem("Water Bottle", "Still mineral water", "Water", "Drinks", "https://via.placeholder.com/100", 1),
            new MenuItem("Mint Lemonade", "Fresh mint lemonade", "Mint, lemon, sugar", "Drinks", "https://via.placeholder.com/100", 3),
            new MenuItem("Iced Tea", "Peach iced tea", "Tea, sugar, peach flavor", "Drinks", "https://via.placeholder.com/100", 3),
            new MenuItem("Ayran", "Cold yogurt drink", "Yogurt, salt, water", "Drinks", "https://via.placeholder.com/100", 2),
            new MenuItem("Pomegranate Juice", "Fresh squeezed", "Pomegranate", "Drinks", "https://via.placeholder.com/100", 4),
            new MenuItem("Mango Juice", "Tropical mango blend", "Mango", "Drinks", "https://via.placeholder.com/100", 4),
            new MenuItem("Espresso", "Hot espresso shot", "Coffee", "Drinks", "https://via.placeholder.com/100", 3)
    );

    repository.saveAll(items);
    System.out.println("✅ Menu items seeded with 10 Fatayer and 10 Drinks.");
}
}