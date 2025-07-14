package com.fatayertime.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String username; // Assuming username is the email

    @NotBlank
    @JsonIgnore // Prevents password from being serialized in API responses
    private String password;

    @NotBlank
    @Column(nullable = false)
    private String role; // You can use enum for roles if you want (recommended)
}
