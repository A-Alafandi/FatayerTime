package com.fatayertime.backend.Controller;


import com.fatayertime.backend.Config.JwtUtil;
import com.fatayertime.backend.Model.RefreshToken;
import com.fatayertime.backend.Repository.UserRepository;
import com.fatayertime.backend.Service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Auth endpoints:
 *  POST /api/auth/login     – returns cookies + access-token JSON
 *  POST /api/auth/refresh   – uses refresh-cookie, returns new access cookie
 */
@RestController
@Slf4j
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")   // ⇐ adjust for prod
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req, HttpServletResponse res) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.username(), req.password())
        );
        String accessToken  = jwtUtil.generateAccessToken(req.username());
        String refreshToken = refreshTokenService.createToken(req.username());

        setCookieManually(res, "refresh", refreshToken, 7 * 24 * 60 * 60);

        return ResponseEntity.ok(Map.of("token", accessToken));
    }
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
            @CookieValue(name = "refresh", required = false) String refreshCookie,
            HttpServletRequest request,
            HttpServletResponse res
    ) {
        if (refreshCookie == null || refreshCookie.isEmpty()) {
            log.warn("No refresh cookie found!");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Missing refresh token.");
        }

        log.info("Incoming refresh cookie: {}", refreshCookie);

        RefreshToken rt = refreshTokenService.verify(refreshCookie);
        String newAccess = jwtUtil.generateAccessToken(rt.getUser().getUsername());

        setCookieManually(res, "access", newAccess, 60 * 15);

        return ResponseEntity.ok(Map.of("token", newAccess));
    }
    private void setCookieManually(HttpServletResponse res, String name, String value, int maxAgeSec) {
        String cookie = String.format(
                "%s=%s; Max-Age=%d; Path=/; Domain=localhost; HttpOnly; Secure; SameSite=None",
                name, value, maxAgeSec
        );
        res.addHeader("Set-Cookie", cookie);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal UserDetails user, HttpServletResponse res) {
        refreshTokenService.deleteByUser(userRepo.findByUsername(user.getUsername()).orElseThrow());
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        res.addCookie(cookie);
        return ResponseEntity.ok().build();
    }
    public record AuthRequest(String username, String password) {}
}