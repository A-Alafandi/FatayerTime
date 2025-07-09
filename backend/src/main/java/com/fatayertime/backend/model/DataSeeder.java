package com.fatayertime.backend.seeder;


import com.fatayertime.backend.model.AppUser;
import com.fatayertime.backend.model.MenuItem;
import com.fatayertime.backend.repository.MenuItemRepository;
import com.fatayertime.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder {

    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void seed() {
        if (menuItemRepository.count() > 0 && userRepository.count() > 0) return;

        // Seed admin
        if (userRepository.count() == 0) {
            AppUser admin = AppUser.builder()
                    .username("admin")
                    .email("admin@fatayertime.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .build();
            userRepository.save(admin);
        }

        // Seed menu
        if (menuItemRepository.count() == 0) {
            String fatayerImg = "https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1";

            List<MenuItem> items = List.of(
                    // Fatayer
                    new MenuItem("Cheese Fatayer", "Melted cheese wrapped in dough", "Cheese, dough", "Fatayer", fatayerImg, 5, true),
                    new MenuItem("Spinach Fatayer", "Spinach with lemon and onion", "Spinach, onion, lemon", "Fatayer", fatayerImg, 5, true),
                    new MenuItem("Zaatar Fatayer", "Thyme and olive oil", "Zaatar, olive oil", "Fatayer", fatayerImg, 4, true),
                    new MenuItem("Meat Fatayer", "Minced beef with spices", "Beef, onion, spices", "Fatayer", fatayerImg, 6, false),
                    new MenuItem("Potato Fatayer", "Mashed potato with herbs", "Potato, herbs", "Fatayer", fatayerImg, 5, true),
                    new MenuItem("Labneh Fatayer", "Labneh and mint", "Labneh, mint", "Fatayer", fatayerImg, 5, true),
                    new MenuItem("Chicken Fatayer", "Chicken with cheese", "Chicken, cheese", "Fatayer", fatayerImg, 6, false),
                    new MenuItem("Hotdog Fatayer", "Hotdog in pastry", "Hotdog, dough", "Fatayer", fatayerImg, 4, false),
                    new MenuItem("Mushroom Fatayer", "Mushroom and cheese", "Mushroom, cheese", "Fatayer", fatayerImg, 5, true),
                    new MenuItem("Mixed Veg Fatayer", "Seasonal vegetables", "Zucchini, pepper, onion", "Fatayer", fatayerImg, 5, true),

                    // Drinks
                    new MenuItem("Coca-Cola", "Chilled 330ml can", "Carbonated drink", "Drinks", "https://via.placeholder.com/100", 2, false),
                    new MenuItem("Fanta Orange", "Orange flavored soda", "Carbonated drink", "Drinks", "https://via.placeholder.com/100", 2, false),
                    new MenuItem("Sprite", "Lemon-lime soda", "Carbonated drink", "Drinks", "https://via.placeholder.com/100", 2, false),
                    new MenuItem("Water Bottle", "Still mineral water", "Water", "Drinks", "https://via.placeholder.com/100", 1, false),
                    new MenuItem("Mint Lemonade", "Fresh mint lemonade", "Mint, lemon, sugar", "Drinks", "https://via.placeholder.com/100", 3, true),
                    new MenuItem("Iced Tea", "Peach iced tea", "Tea, sugar, peach flavor", "Drinks", "https://via.placeholder.com/100", 3, false),
                    new MenuItem("Ayran", "Cold yogurt drink", "Yogurt, salt, water", "Drinks", "https://via.placeholder.com/100", 2, false),
                    new MenuItem("Pomegranate Juice", "Fresh squeezed", "Pomegranate", "Drinks", "https://via.placeholder.com/100", 4, true),
                    new MenuItem("Mango Juice", "Tropical mango blend", "Mango", "Drinks", "https://via.placeholder.com/100", 4, true),
                    new MenuItem("Espresso", "Hot espresso shot", "Coffee", "Drinks", "https://via.placeholder.com/100", 3, false)
            );

            menuItemRepository.saveAll(items);
        }
    }
}
