package com.fatayertime.backend.Service;


import com.fatayertime.backend.Model.AppUser;
import com.fatayertime.backend.Model.RefreshToken;
import com.fatayertime.backend.Repository.RefreshTokenRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.jwt.refresh-token.expiration-ms}")
    private Long refreshTokenExpirationMs;

    @PostConstruct
    public void printTokenExpiryConfig() {
        System.out.println("Refresh token expiration (ms): " + refreshTokenExpirationMs);
    }

    /**
     * Create or update a refresh token for the given user.
     */
    @Transactional
    public RefreshToken createToken(AppUser user) {
        return refreshTokenRepository.findByUser(user)
                .map(existingToken -> {
                    existingToken.setToken(UUID.randomUUID().toString());
                    existingToken.setExpiryDate(Instant.now().plusMillis(refreshTokenExpirationMs));
                    return refreshTokenRepository.save(existingToken);
                })
                .orElseGet(() -> {
                    RefreshToken token = new RefreshToken();
                    token.setUser(user);
                    token.setToken(UUID.randomUUID().toString());
                    token.setExpiryDate(Instant.now().plusMillis(refreshTokenExpirationMs));
                    return refreshTokenRepository.save(token);
                });
    }
    /**
     * Verifies the given refresh token: it must exist and not be expired.
     *
     * @param token the refresh token string
     * @return the valid RefreshToken entity
     * @throws RuntimeException if the token is invalid or expired
     */
    public RefreshToken verify(String token) {
        return refreshTokenRepository.findByToken(token)
                .filter(this::isTokenValid)
                .orElseThrow(() -> new RuntimeException("Invalid or expired refresh token"));
    }

    /**
     * Validate whether a token is still valid (not expired).
     */
    public boolean isTokenValid(RefreshToken token) {
        return token != null && token.getExpiryDate().isAfter(Instant.now());
    }

    /**
     * Find token by its string value.
     */
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    /**
     * Delete token by user.
     */
    public void deleteByUser(AppUser user) {
        refreshTokenRepository.deleteByUser(user);
    }
}
