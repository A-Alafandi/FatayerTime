package com.fatayertime.backend.Service;


import com.fatayertime.backend.Model.AppUser;
import com.fatayertime.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Primary
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) {
        AppUser appUser = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        String role = appUser.getRole().startsWith("ROLE_") ? appUser.getRole() : "ROLE_" + appUser.getRole();

        return User.builder()
                .username(appUser.getUsername())
                .password(appUser.getPassword())
                .authorities(role)
                .build();
    }
}