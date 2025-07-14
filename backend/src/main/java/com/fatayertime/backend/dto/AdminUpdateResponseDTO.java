package com.fatayertime.backend.dto;


import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUpdateResponseDTO {
    private String username;
    private String message;
    private boolean success;
}
