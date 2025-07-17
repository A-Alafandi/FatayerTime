package com.fatayertime.backend.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer"; // default value
    private String username;
    private String role;
    private String error;

    // Convenience constructor for successful login response
    public LoginResponseDTO(String accessToken, String username, String role) {
        this.accessToken = accessToken;
        this.tokenType = "Bearer";
        this.username = username;
        this.role = role;
        this.error = null;
    }

    // Convenience constructor for error response
    public LoginResponseDTO(String error) {
        this.error = error;
    }
}