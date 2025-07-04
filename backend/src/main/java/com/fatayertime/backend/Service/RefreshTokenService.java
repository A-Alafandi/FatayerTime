package com.fatayertime.backend.Service;

import com.fatayertime.backend.Model.AppUser;
import com.fatayertime.backend.Model.RefreshToken;
import com.fatayertime.backend.Repository.RefreshTokenRepository;
import com.fatayertime.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepo;
    private final UserRepository         userRepo;

    /* ─────────────── CREATE ─────────────── */

    /** Create a fresh 7-day token, replacing any existing one for this user. */
    @Transactional
    public String createToken(String username) {

        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // remove any previous token for the same user
        refreshTokenRepo.deleteByUser(user);

        RefreshToken token = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiryDate(Instant.now().plusSeconds(7 * 24 * 60 * 60)) // 7 days
                .build();

        refreshTokenRepo.save(token);
        return token.getToken();
    }

    /* ─────────────── VERIFY ─────────────── */

    /**
     * Validate the given refresh-token string and return the entity.
     * <br>
     * NOTE: we **no longer delete** the row here – that prevents the
     * “Row was updated or deleted by another transaction” race when two
     * requests hit the endpoint almost simultaneously.
     */
    @Transactional(readOnly = true)
    public RefreshToken verify(String tokenValue) {

        RefreshToken token = refreshTokenRepo.findByToken(tokenValue)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (token.getExpiryDate().isBefore(Instant.now())) {

            refreshTokenRepo.delete(token);
            throw new RuntimeException("Expired refresh token");
        }
        return token;
    }


    @Transactional
    public void deleteByUser(AppUser user) {
        refreshTokenRepo.deleteByUser(user);
    }
}
