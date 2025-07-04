package com.fatayertime.backend.Repository;

import com.fatayertime.backend.Model.AppUser;
import com.fatayertime.backend.Model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(AppUser user);
}
