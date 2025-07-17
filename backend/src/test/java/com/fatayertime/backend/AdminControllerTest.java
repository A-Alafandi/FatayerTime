//package com.fatayertime.backend;
//
//import com.fatayertime.backend.controller.AdminController;
//import com.fatayertime.backend.dto.AdminUpdateRequestDTO;
//import com.fatayertime.backend.dto.AdminUpdateResponseDTO;
//import com.fatayertime.backend.model.AppUser;
//import com.fatayertime.backend.repository.UserRepository;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.Optional;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.Mockito.when;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@WebMvcTest(AdminController.class)
//class AdminControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private UserRepository userRepository;
//
//    @MockBean
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void updateProfile_ValidRequest_ReturnsSuccess() throws Exception {
//        // Arrange
//        AdminUpdateRequestDTO request = new AdminUpdateRequestDTO();
//        request.setCurrentPassword("currentPass");
//        request.setNewUsername("newadmin@test.com");
//        request.setNewPassword("newPass");
//
//        AppUser admin = new AppUser();
//        admin.setUsername("admin@test.com");
//        admin.setPassword("encodedCurrentPass");
//
//        when(userRepository.findByUsername("newadmin@test.com")).thenReturn(Optional.of(admin));
//        when(passwordEncoder.matches("currentPass", "encodedCurrentPass")).thenReturn(true);
//        when(userRepository.existsByUsername("newadmin@test.com")).thenReturn(false);
//        when(passwordEncoder.encode("newPass")).thenReturn("encodedNewPass");
//        when(userRepository.save(any(AppUser.class))).thenReturn(admin);
//
//        // Act & Assert
//        mockMvc.perform(put("/api/admin/update")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request))
//                        .with(csrf()))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.username").value("newadmin@test.com"))
//                .andExpect(jsonPath("$.message").value("Profile updated successfully"))
//                .andExpect(jsonPath("$.success").value(true));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void updateProfile_WrongCurrentPassword_ReturnsBadRequest() throws Exception {
//        // Arrange
//        AdminUpdateRequestDTO request = new AdminUpdateRequestDTO();
//        request.setCurrentPassword("wrongPass");
//        request.setNewUsername("admin@test.com");
//        request.setNewPassword("newPass");
//
//        AppUser admin = new AppUser();
//        admin.setUsername("admin@test.com");
//        admin.setPassword("encodedCurrentPass");
//
//        when(userRepository.findByUsername("admin@test.com")).thenReturn(Optional.of(admin));
//        when(passwordEncoder.matches("wrongPass", "encodedCurrentPass")).thenReturn(false);
//
//        // Act & Assert
//        mockMvc.perform(put("/api/admin/update")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request))
//                        .with(csrf()))
//                .andExpect(status().isBadRequest())
//                .andExpect(jsonPath("$.message").value("Current password is incorrect"))
//                .andExpect(jsonPath("$.success").value(false));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void updateProfile_UsernameAlreadyExists_ReturnsBadRequest() throws Exception {
//        // Arrange
//        AdminUpdateRequestDTO request = new AdminUpdateRequestDTO();
//        request.setCurrentPassword("currentPass");
//        request.setNewUsername("existing@test.com");
//        request.setNewPassword("newPass");
//
//        AppUser admin = new AppUser();
//        admin.setUsername("admin@test.com");
//        admin.setPassword("encodedCurrentPass");
//
//        when(userRepository.findByUsername("existing@test.com")).thenReturn(Optional.of(admin));
//        when(passwordEncoder.matches("currentPass", "encodedCurrentPass")).thenReturn(true);
//        when(userRepository.existsByUsername("existing@test.com")).thenReturn(true);
//
//        // Act & Assert
//        mockMvc.perform(put("/api/admin/update")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request))
//                        .with(csrf()))
//                .andExpect(status().isBadRequest())
//                .andExpect(jsonPath("$.message").value("Username/email is already in use"))
//                .andExpect(jsonPath("$.success").value(false));
//    }
//}