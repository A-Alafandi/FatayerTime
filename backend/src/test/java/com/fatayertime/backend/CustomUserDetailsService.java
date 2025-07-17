//package com.fatayertime.backend;
//
//import com.fatayertime.backend.model.AppUser;
//import com.fatayertime.backend.repository.UserRepository;
//import com.fatayertime.backend.service.CustomUserDetailsService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatThrownBy;
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//class CustomUserDetailsServiceTest {
//
//    @Mock
//    private UserRepository userRepository;
//
//    @InjectMocks
//    private CustomUserDetailsServiceTest customUserDetailsService;
//
//    @Test
//    void loadUserByUsername_UserExists_ReturnsUserDetails() {
//        // Arrange
//        AppUser appUser = new AppUser();
//        appUser.setUsername("admin@test.com");
//        appUser.setPassword("encodedPassword");
//        appUser.setRole("ADMIN");
//
//        when(userRepository.findByUsername("admin@test.com")).thenReturn(Optional.of(appUser));
//
//        // Act
//        UserDetails userDetails = customUserDetailsService.loadUserByUsername("admin@test.com");
//
//        // Assert
//        assertThat(userDetails.getUsername()).isEqualTo("admin@test.com");
//        assertThat(userDetails.getPassword()).isEqualTo("encodedPassword");
//        assertThat(userDetails.getAuthorities()).hasSize(1);
//        assertThat(userDetails.getAuthorities().iterator().next().getAuthority()).isEqualTo("ROLE_ADMIN");
//    }
//
//    @Test
//    void loadUserByUsername_UserNotFound_ThrowsException() {
//        // Arrange
//        when(userRepository.findByUsername("nonexistent@test.com")).thenReturn(Optional.empty());
//
//        // Act & Assert
//        assertThatThrownBy(() -> customUserDetailsService.loadUserByUsername("nonexistent@test.com"))
//                .isInstanceOf(UsernameNotFoundException.class)
//                .hasMessage("User not found: nonexistent@test.com");
//    }
//}
