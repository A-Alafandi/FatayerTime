//package com.fatayertime.backend;
//
//import com.fatayertime.backend.dto.AdminUpdateRequestDTO;
//import com.fatayertime.backend.model.AppUser;
//import com.fatayertime.backend.repository.UserRepository;
//import com.fatayertime.backend.service.UserService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.assertThatThrownBy;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//class UserServiceTest {
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @InjectMocks
//    private UserService userService;
//
//    @Test
//    void updateAdminAccount_ValidRequest_UpdatesSuccessfully() {
//        // Arrange
//        AdminUpdateRequestDTO request = new AdminUpdateRequestDTO("newadmin@test.com", "currentPass", "newPass");
//        AppUser admin = new AppUser();
//        admin.setUsername("admin@test.com");
//        admin.setPassword("encodedCurrentPass");
//
//        when(userRepository.findByUsername("admin@test.com")).thenReturn(Optional.of(admin));
//        when(passwordEncoder.matches("currentPass", "encodedCurrentPass")).thenReturn(true);
//        when(userRepository.existsByUsername("newadmin@test.com")).thenReturn(false);
//        when(passwordEncoder.encode("newPass")).thenReturn("encodedNewPass");
//
//        // Act
//        userService.updateAdminAccount(request, "admin@test.com");
//
//        // Assert
//        verify(userRepository).save(admin);
//        verify(passwordEncoder).encode("newPass");
//    }
//
//    @Test
//    void updateAdminAccount_WrongCurrentPassword_ThrowsException() {
//        // Arrange
//        AdminUpdateRequestDTO request = new AdminUpdateRequestDTO("admin@test.com", "wrongPass", "newPass");
//        AppUser admin = new AppUser();
//        admin.setUsername("admin@test.com");
//        admin.setPassword("encodedCurrentPass");
//
//        when(userRepository.findByUsername("admin@test.com")).thenReturn(Optional.of(admin));
//        when(passwordEncoder.matches("wrongPass", "encodedCurrentPass")).thenReturn(false);
//
//        // Act & Assert
//        assertThatThrownBy(() -> userService.updateAdminAccount(request, "admin@test.com"))
//                .isInstanceOf(RuntimeException.class)
//                .hasMessage("Current password is incorrect");
//
//        verify(userRepository, never()).save(any());
//    }
//
//    @Test
//    void updateAdminAccount_UsernameAlreadyExists_ThrowsException() {
//        // Arrange
//        AdminUpdateRequestDTO request = new AdminUpdateRequestDTO("existing@test.com", "currentPass", "newPass");
//        AppUser admin = new AppUser();
//        admin.setUsername("admin@test.com");
//        admin.setPassword("encodedCurrentPass");
//
//        when(userRepository.findByUsername("admin@test.com")).thenReturn(Optional.of(admin));
//        when(passwordEncoder.matches("currentPass", "encodedCurrentPass")).thenReturn(true);
//        when(userRepository.existsByUsername("existing@test.com")).thenReturn(true);
//
//        // Act & Assert
//        assertThatThrownBy(() -> userService.updateAdminAccount(request, "admin@test.com"))
//                .isInstanceOf(RuntimeException.class)
//                .hasMessage("Username already in use");
//
//        verify(userRepository, never()).save(any());
//    }
//
//    @Test
//    void updateAdminAccount_UserNotFound_ThrowsException() {
//        // Arrange
//        AdminUpdateRequestDTO request = new AdminUpdateRequestDTO("newadmin@test.com", "currentPass", "newPass");
//        when(userRepository.findByUsername("admin@test.com")).thenReturn(Optional.empty());
//
//        // Act & Assert
//        assertThatThrownBy(() -> userService.updateAdminAccount(request, "admin@test.com"))
//                .isInstanceOf(RuntimeException.class)
//                .hasMessage("User not found");
//
//        verify(userRepository, never()).save(any());
//    }
//}