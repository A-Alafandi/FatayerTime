package com.fatayertime.backend.service;


import com.fatayertime.backend.config.SecurityConfig;
import com.fatayertime.backend.model.AppUser;
import com.fatayertime.backend.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;
    private  SecurityConfig securityConfig;


    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return User.builder()
                .username(appUser.getUsername())
                .password(appUser.getPassword())
                .roles(appUser.getRole())
                .build();
    }
    public AppUser createAdminUser() {

        if (userRepo.findByUsername("admin").isPresent()) {
            System.out.println("✅ Admin already exists.");
            return null;
        }
        AppUser user = new AppUser();
        user.setId(UUID.randomUUID());
        user.setUsername("admin");
        user.setPassword("admin123");
        user.setRole("ADMIN");

        return userRepo.save(user);
    }
}
