package com.fatayertime.backend.model;


import com.fatayertime.backend.repository.MenuItemRepository;
import com.fatayertime.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataSeeder {

    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @PostConstruct
    public void seedDatabase() {
        seedAdmin();
        seedData();
    }

    @PostConstruct
    public void seedData() {
        if (menuItemRepository.count() == 0) {
            log.info("🌱 Seeding initial menu items...");

            menuItemRepository.save(MenuItem.builder()
                    .name("Spinach Fatayer")
                    .description("Delicious spinach pastry with onions and lemon.")
                    .price(3.5)
                    .category("Fatayer")
                    .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                    .isVegetarian(true)
                    .isSpicy(false)
                    .ingredients(List.of("Spinach", "Onion", "Lemon", "Olive Oil", "Dough"))
                    .build());

            menuItemRepository.save(MenuItem.builder()
                    .name("Cheese Fatayer")
                    .description("Soft pastry filled with cheese and parsley.")
                    .price(3.3)
                    .category("Fatayer")
                    .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                    .isVegetarian(true)
                    .isSpicy(false)
                    .ingredients(List.of("Cheese", "Parsley", "Dough"))
                    .build());

            menuItemRepository.save(MenuItem.builder()
                    .name("Meat Fatayer")
                    .description("Juicy beef and onion pastry with spices.")
                    .price(7.0)
                    .category("Fatayer")
                    .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                    .isVegetarian(false)
                    .isSpicy(true)
                    .ingredients(List.of("Beef", "Onion", "Spices", "Dough"))
                    .build());

            menuItemRepository.save(MenuItem.builder()
                    .name("Spinach with Fatayer")
                    .description("Delicious spinach pastry with onions and lemon.")
                    .price(3.5)
                    .category("Fatayer")
                    .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                    .isVegetarian(true)
                    .isSpicy(false)
                    .ingredients(List.of("Spinach", "Onion", "Lemon", "Olive Oil", "Dough"))
                    .build());

            menuItemRepository.save(MenuItem.builder()
                    .name("Cheese with Fatayer")
                    .description("Soft pastry filled with cheese and parsley.")
                    .price(3.3)
                    .category("Fatayer")
                    .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                    .isVegetarian(true)
                    .isSpicy(false)
                    .ingredients(List.of("Cheese", "Parsley", "Dough"))
                    .build());

            menuItemRepository.save(MenuItem.builder()
                    .name("Meat with Fatayer")
                    .description("Juicy beef and onion pastry with spices.")
                    .price(7.0)
                    .category("Fatayer")
                    .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                    .isVegetarian(false)
                    .isSpicy(true)
                    .ingredients(List.of("Beef", "Onion", "Spices", "Dough"))
                    .build());

            log.info("✅ Menu items seeded successfully.");
        } else {
            log.info("ℹ️ Menu already seeded. Skipping.");
        }
    }
    private void seedAdmin() {
        if (userRepository.findByUsername("admin@example.com").isEmpty()) {
            AppUser admin = new AppUser();
            admin.setId(UUID.randomUUID());
            admin.setUsername("admin@example.com");
            admin.setPassword("$2a$10$ORTVr3lFkaGqdHSWs05pVOuaeRNDcGmhhwpk8yfmft6NzAr2ujICa");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            log.info("✅ Admin account seeded.");
        }
    }
}
