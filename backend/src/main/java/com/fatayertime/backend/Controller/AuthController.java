package com.fatayertime.backend.Controller;




import com.fatayertime.backend.Config.JwtResponse;
import com.fatayertime.backend.Config.JwtUtil;
import com.fatayertime.backend.Model.AppUser;
import com.fatayertime.backend.Model.RefreshToken;
import com.fatayertime.backend.Repository.UserRepository;
import com.fatayertime.backend.Request.LoginRequest;
import com.fatayertime.backend.Service.CustomUserDetailsService;
import com.fatayertime.backend.Service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Map;

/**
 * Auth endpoints:
 *  POST /api/auth/login     – returns cookies + access-token JSON
 *  POST /api/auth/refresh   – uses refresh-cookie, returns new access cookie
 */
@RestController
@Slf4j
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            // 1. Authenticate
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // 2. Get user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            AppUser user = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            log.info("Successful login for user: {}", user.getUsername());

            // 3. Generate tokens
            RefreshToken refreshToken = refreshTokenService.createToken(user);
            String accessToken = jwtUtil.generateAccessToken(user);

            // 4. Set cookies
            setRefreshTokenCookie(response, refreshToken.getToken());
            setCookieManually(response, "accessToken", accessToken, 60 * 15); // 15 mins

            // 5. Return response
            return ResponseEntity.ok()
                    .body(Map.of(
                            "token", accessToken,
                            "username", user.getUsername(),
                            "role", user.getRole()
                    ));

        } catch (Exception ex) {
            log.error("Login failed for {}: {}", loginRequest.getUsername(), ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
            @CookieValue(name = "refreshToken", required = false) String refreshCookie,
            HttpServletRequest request,
            HttpServletResponse res
    ) {
        if (refreshCookie == null || refreshCookie.isEmpty()) {
            log.warn("No refresh cookie found!");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Missing refresh token.");
        }

        log.info("Incoming refresh cookie: {}", refreshCookie);

        try {
            RefreshToken rt = refreshTokenService.verify(refreshCookie);
            AppUser user = rt.getUser();

            String newAccessToken = jwtUtil.generateAccessToken(user);

            // Optional: send new access token as a cookie (if needed)
            setCookieManually(res, "accessToken", newAccessToken, 60 * 15);

            return ResponseEntity.ok(Map.of("token", newAccessToken));

        } catch (Exception e) {
            log.error("Refresh token invalid: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@AuthenticationPrincipal UserDetails user, HttpServletResponse res) {
        refreshTokenService.deleteByUser(userRepo.findByUsername(user.getUsername()).orElseThrow());
        Cookie cookie = new Cookie("refresh", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/api/auth"); // match your auth path
        cookie.setMaxAge(0); // expire immediately
        res.addCookie(cookie);
        return ResponseEntity.ok().build();
    }
    public record AuthRequest(String username, String password) {}

    private void setRefreshTokenCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", token)
                .httpOnly(true)
                .secure(false) // Enable in production
                .path("/api/auth/refresh")
                .maxAge(7 * 24 * 60 * 60) // 7 days
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }
    private void setCookieManually(HttpServletResponse response, String name, String value, int maxAgeSec) {
        ResponseCookie cookie = ResponseCookie.from(name, value)
                .httpOnly(false) // Accessible via JS
                .secure(false)
                .path("/")
                .maxAge(maxAgeSec)
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }
}