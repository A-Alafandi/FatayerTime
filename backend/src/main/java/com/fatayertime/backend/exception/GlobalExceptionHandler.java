package com.fatayertime.backend.exception;

import com.fatayertime.backend.dto.ApiResponseDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle bean validation errors (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDTO<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = error instanceof FieldError fieldError ? fieldError.getField() : error.getObjectName();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        ApiResponseDTO<Map<String, String>> apiResponse = new ApiResponseDTO<>(false, "Validation failed", errors);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    // Handle path variable / request param type mismatches (e.g., invalid UUID)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponseDTO<String>> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String message = String.format("Invalid value '%s' for parameter '%s'. Expected type: %s.",
                ex.getValue(), ex.getName(), ex.getRequiredType().getSimpleName());
        return new ResponseEntity<>(new ApiResponseDTO<>(false, message, null), HttpStatus.BAD_REQUEST);
    }

    // Handle entity not found (optional, if you throw these)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponseDTO<String>> handleEntityNotFound(EntityNotFoundException ex) {
        return new ResponseEntity<>(new ApiResponseDTO<>(false, ex.getMessage(), null), HttpStatus.NOT_FOUND);
    }

    // Catch-all for uncaught exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDTO<String>> handleAllExceptions(Exception ex, WebRequest request) {
        ex.printStackTrace(); // Log to server for debugging; replace with logger in production!
        ApiResponseDTO<String> apiResponse = new ApiResponseDTO<>(false, "An unexpected error occurred", null);
        return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
