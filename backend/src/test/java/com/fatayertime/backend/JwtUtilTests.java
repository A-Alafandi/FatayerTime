//package com.fatayertime.backend;
//
//import com.fatayertime.backend.config.JwtUtil;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@SpringBootTest
//class JwtUtilTests {
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Test
//    void generateAndValidateToken() {
//        String username = "testuser";
//
//        String token = jwtUtil.generateToken(username);
//
//        assertThat(jwtUtil.extractUsername(token)).isEqualTo(username);
//        assertThat(jwtUtil.validateToken(token, username)).isTrue();
//        assertThat(jwtUtil.validateToken(token, "other")).isFalse();
//    }
//}
//
