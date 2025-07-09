//package com.fatayertime.backend.model;
//
//import com.fatayertime.backend.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.Value;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Profile;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//@Profile("prod")          // Remove if you also want it in dev
//@RequiredArgsConstructor
//public class AdminSeeder implements CommandLineRunner {
//
//    private final UserRepository userRepo;
//    private final PasswordEncoder passwordEncoder;
//
//    @Value("${admin.username}")
//    private String adminUsername;
//
//    @Value("${admin.password}")
//    private String adminPassword;
//
//    @Override
//    public void run(String... args) {
//        if (userRepo.countByRole("ADMIN") == 0) {
//            AppUser admin = new AppUser();
//            admin.setUsername(adminUsername);
//            admin.setPassword(passwordEncoder.encode(adminPassword));
//            admin.setRole("ADMIN");
//            userRepo.save(admin);
//            System.out.println("✅ Admin user seeded: " + adminUsername);
//        } else {
//            System.out.println("ℹ️ Admin already exists, seeding skipped");
//        }
//    }
//}