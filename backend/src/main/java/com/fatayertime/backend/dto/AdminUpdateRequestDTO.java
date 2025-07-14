package com.fatayertime.backend.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public  class AdminUpdateRequestDTO {
    private String currentPassword;
    private String newUsername;
    private String newPassword;
}
