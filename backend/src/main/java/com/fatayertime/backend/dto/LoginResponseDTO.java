package com.fatayertime.backend.dto;

import lombok.*;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
    private String accessToken;
    private String tokenType;
    private String username;
    private String role;
    private String error;
}