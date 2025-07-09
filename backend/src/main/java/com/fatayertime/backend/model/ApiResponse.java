package com.fatayertime.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private String message;
    private T data;
    private List<String> errors;

    public ApiResponse(String message, T data) {
        this(message, data, null);
    }

    public ApiResponse(String message) {
        this(message, null, null);
    }
}