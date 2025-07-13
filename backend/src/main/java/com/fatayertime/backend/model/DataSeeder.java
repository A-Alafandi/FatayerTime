package com.fatayertime.backend.model;


import com.fatayertime.backend.repository.MenuItemRepository;
import com.fatayertime.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

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

    private void seedData() {
        if (menuItemRepository.count() == 0) {
            log.info("🌱 Seeding initial menu items...");

            menuItemRepository.save(MenuItem.builder()
                    .name(FatayerConstants.SPINACH_FATAYER)
                    .description(FatayerConstants.SPINACH_DESC)
                    .price(6.5)
                    .category(FatayerConstants.CATEGORY_FATAYER)
                    .build());

            menuItemRepository.save(MenuItem.builder()
                    .name(FatayerConstants.CHEESE_FATAYER)
                    .description(FatayerConstants.CHEESE_DESC)
                    .price(5.5)
                    .category(FatayerConstants.CATEGORY_FATAYER)
                    .build());

            menuItemRepository.save(MenuItem.builder()
                    .name(FatayerConstants.MEAT_FATAYER)
                    .description(FatayerConstants.MEAT_DESC)
                    .price(7.0)
                    .category(FatayerConstants.CATEGORY_FATAYER)
                    .build());

            log.info("✅ Menu items seeded successfully.");
        } else {
            log.info("ℹ️ Menu already seeded. Skipping.");
        }
    }

    private void seedAdmin() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            AppUser admin = new AppUser();
            admin.setId(UUID.randomUUID());
            admin.setUsername("admin");
            admin.setPassword("$2a$10$ORTVr3lFkaGqdHSWs05pVOuaeRNDcGmhhwpk8yfmft6NzAr2ujICa");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            log.info("✅ Admin account seeded.");
        }
    }
}
