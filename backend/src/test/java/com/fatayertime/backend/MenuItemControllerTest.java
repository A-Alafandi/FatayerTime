//package com.fatayertime.backend;
//
//import com.fatayertime.backend.controller.MenuItemController;
//import com.fatayertime.backend.dto.MenuItemRequestDTO;
//import com.fatayertime.backend.dto.MenuItemResponseDTO;
//import com.fatayertime.backend.service.MenuItemService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.math.BigDecimal;
//import java.util.Arrays;
//import java.util.List;
//import java.util.UUID;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.eq;
//import static org.mockito.Mockito.when;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@WebMvcTest(MenuItemController.class)
//class MenuItemControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private MenuItemService menuItemService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Test
//    void getAllMenuItems_ReturnsMenuItems() throws Exception {
//        // Arrange
//        List<MenuItemResponseDTO> menuItems = Arrays.asList(
//                MenuItemResponseDTO.builder()
//                        .id(UUID.randomUUID())
//                        .name("Pizza")
//                        .description("Delicious pizza")
//                        .price(12.99)
//                        .category("Main")
//                        .imageUrl("pizza.jpg")
//                        .ingredients("Cheese, Tomato")
//                        .isVegetarian(true)
//                        .build(),
//                MenuItemResponseDTO.builder()
//                        .id(UUID.randomUUID())
//                        .name("Burger")
//                        .description("Tasty burger")
//                        .price(8.99)
//                        .category("Main")
//                        .imageUrl("burger.jpg")
//                        .ingredients("Beef, Lettuce")
//                        .isVegetarian(false)
//                        .build()
//        );
//        when(menuItemService.getAll()).thenReturn(menuItems);
//
//        // Act & Assert
//        mockMvc.perform(get("/api/menu"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(2))
//                .andExpect(jsonPath("$[0].name").value("Pizza"))
//                .andExpect(jsonPath("$[1].name").value("Burger"));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void getMenuItemById_AdminUser_ReturnsMenuItem() throws Exception {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        MenuItemResponseDTO menuItem = MenuItemResponseDTO.builder()
//                .id(id)
//                .name("Pizza")
//                .description("Delicious pizza")
//                .price(12.99)
//                .category("Main")
//                .imageUrl("pizza.jpg")
//                .ingredients("Cheese, Tomato")
//                .isVegetarian(true)
//                .build();
//        when(menuItemService.getById(id)).thenReturn(menuItem);
//
//        // Act & Assert
//        mockMvc.perform(get("/api/menu/{id}", id))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("Pizza"))
//                .andExpect(jsonPath("$.id").value(id.toString()));
//    }
//
//    @Test
//    @WithMockUser(roles = "USER")
//    void getMenuItemById_RegularUser_ReturnsForbidden() throws Exception {
//        // Arrange
//        UUID id = UUID.randomUUID();
//
//        // Act & Assert
//        mockMvc.perform(get("/api/menu/{id}", id))
//                .andExpect(status().isForbidden());
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void createMenuItem_AdminUser_ReturnsCreated() throws Exception {
//        // Arrange
//        MenuItemRequestDTO request = MenuItemRequestDTO.builder()
//                .name("New Pizza")
//                .description("Amazing pizza")
//                .price(15.99)
//                .category("Main")
//                .imageUrl("new-pizza.jpg")
//                .ingredients("Cheese, Pepperoni")
//                .isVegetarian(false)
//                .build();
//        UUID id = UUID.randomUUID();
//        MenuItemResponseDTO response = MenuItemResponseDTO.builder()
//                .id(id)
//                .name("New Pizza")
//                .description("Amazing pizza")
//                .price(15.99)
//                .category("Main")
//                .imageUrl("new-pizza.jpg")
//                .ingredients("Cheese, Pepperoni")
//                .isVegetarian(false)
//                .build();
//        when(menuItemService.create(any(MenuItemRequestDTO.class))).thenReturn(response);
//
//        // Act & Assert
//        mockMvc.perform(post("/api/menu")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request))
//                        .with(csrf()))
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.name").value("New Pizza"))
//                .andExpect(header().string("Location", "/api/menu/" + id));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void updateMenuItem_AdminUser_ReturnsUpdated() throws Exception {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        MenuItemRequestDTO request = MenuItemRequestDTO.builder()
//                .name("Updated Pizza")
//                .description("Updated description")
//                .price(16.99)
//                .category("Main")
//                .imageUrl("updated-pizza.jpg")
//                .ingredients("Cheese, Mushrooms")
//                .isVegetarian(true)
//                .build();
//        MenuItemResponseDTO response = MenuItemResponseDTO.builder()
//                .id(id)
//                .name("Updated Pizza")
//                .description("Updated description")
//                .price(16.99)
//                .category("Main")
//                .imageUrl("updated-pizza.jpg")
//                .ingredients("Cheese, Mushrooms")
//                .isVegetarian(true)
//                .build();
//        when(menuItemService.update(eq(id), any(MenuItemRequestDTO.class))).thenReturn(response);
//
//        // Act & Assert
//        mockMvc.perform(put("/api/menu/{id}", id)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request))
//                        .with(csrf()))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("Updated Pizza"));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void deleteMenuItem_AdminUser_ReturnsNoContent() throws Exception {
//        // Arrange
//        UUID id = UUID.randomUUID();
//
//        // Act & Assert
//        mockMvc.perform(delete("/api/menu/{id}", id)
//                        .with(csrf()))
//                .andExpect(status().isNoContent());
//    }
//}
