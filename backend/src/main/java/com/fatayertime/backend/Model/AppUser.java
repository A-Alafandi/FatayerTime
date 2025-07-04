package com.fatayertime.backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Entity
public class AppUser {
    @Id
    @GeneratedValue
    private UUID id;
    private String username;
    private String password;
    private String role;
}