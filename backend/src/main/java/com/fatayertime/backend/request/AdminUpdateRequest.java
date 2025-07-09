package com.fatayertime.backend.request;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public  class AdminUpdateRequest {
    private String currentPassword;
    private String newUsername;
    private String newPassword;
}
