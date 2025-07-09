package com.fatayertime.backend.model;

import com.fatayertime.backend.repository.MenuItemRepository;
import com.fatayertime.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
@Component
@RequiredArgsConstructor
public class DataSeeder {
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void seedDatabase() {
        seedAdmin();
        seedMenu();
    }
    private void seedMenu() {
        if (menuItemRepository.count() == 0) {
            String fatayerImg = "https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1";

            List<MenuItem> items = List.of(
                    // Fatayer
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true),
                    new MenuItem(UUID.randomUUID(),"Spinach Fatayer","pinach with lemon and onion",5.5,"Fatayer",fatayerImg,"Spinach, onion, lemon",true)
            );

            menuItemRepository.saveAll(items);
        }
    }

    private void seedAdmin() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            AppUser admin = new AppUser();
            admin.setId(UUID.randomUUID());
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("✅ Admin account seeded.");
        }

    }
}