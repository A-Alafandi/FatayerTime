//package com.fatayertime.backend;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@TestPropertySource(locations = "classpath:application-test.properties")
//class AuthControllerTests {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Test
//    void loginWithValidCredentialsReturnsToken() throws Exception {
//        String body = "{\"username\":\"admin\",\"password\":\"admin123\"}";
//
//        mockMvc.perform(post("/api/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(body))
//                .andExpect(status().isOk())
//                .andExpect(header().exists(HttpHeaders.AUTHORIZATION))
//                .andExpect(jsonPath("$.token").isNotEmpty())
//                .andExpect(jsonPath("$.message").value("Login successful"));
//    }
//
//    @Test
//    void loginWithInvalidCredentialsReturnsUnauthorized() throws Exception {
//        String body = "{\"username\":\"admin\",\"password\":\"wrong\"}";
//
//        mockMvc.perform(post("/api/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(body))
//                .andExpect(status().isUnauthorized());
//    }
//}
//
