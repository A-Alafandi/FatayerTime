package com.fatayertime.backend.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public  class AdminUpdateRequest {
    private String currentPassword;
    private String newUsername;
    private String newPassword;
}
