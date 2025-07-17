//package com.fatayertime.backend;
//
//import com.fatayertime.backend.dto.MenuItemRequestDTO;
//import com.fatayertime.backend.dto.MenuItemResponseDTO;
//import com.fatayertime.backend.model.MenuItem;
//import com.fatayertime.backend.repository.MenuItemRepository;
//import com.fatayertime.backend.service.MenuItemServiceImpl;
//import jakarta.persistence.EntityNotFoundException;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.math.BigDecimal;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatThrownBy;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//class MenuItemServiceImplTest {
//
//    @Mock
//    private MenuItemRepository menuItemRepository;
//
//    @InjectMocks
//    private MenuItemServiceImpl menuItemService;
//
//    @Test
//    void getAll_ReturnsAllMenuItems() {
//        // Arrange
//        MenuItem item1 = createMenuItem("Pizza", "Delicious pizza", 12.99, "Main", "pizza.jpg", "Cheese, Tomato", true);
//        MenuItem item2 = createMenuItem("Burger", "Tasty burger", 8.99, "Main", "burger.jpg", "Beef, Lettuce", false);
//        when(menuItemRepository.findAll()).thenReturn(Arrays.asList(item1, item2));
//
//        // Act
//        List<MenuItemResponseDTO> result = menuItemService.getAll();
//
//        // Assert
//        assertThat(result).hasSize(2);
//        assertThat(result.get(0).getName()).isEqualTo("Pizza");
//        assertThat(result.get(1).getName()).isEqualTo("Burger");
//    }
//
//    @Test
//    void getById_MenuItemExists_ReturnsMenuItem() {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        MenuItem menuItem = createMenuItem("Pizza", "Delicious pizza", 12.99, "Main", "pizza.jpg", "Cheese, Tomato", true);
//        menuItem.setId(id);
//        when(menuItemRepository.findById(id)).thenReturn(Optional.of(menuItem));
//
//        // Act
//        MenuItemResponseDTO result = menuItemService.getById(id);
//
//        // Assert
//        assertThat(result.getName()).isEqualTo("Pizza");
//        assertThat(result.getId()).isEqualTo(id);
//    }
//
//    @Test
//    void getById_MenuItemNotFound_ThrowsException(UUID uuid) {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        when(menuItemRepository.findById(id)).thenReturn(Optional.empty());
//
//        // Act & Assert
//        assertThatThrownBy(() -> menuItemService.getById(id))
//                .isInstanceOf(EntityNotFoundException.class)
//                .hasMessage("Menu item not found");
//    }
//
//    @Test
//    void getVegetarian_ReturnsVegetarianItems(UUID uuid) {
//        // Arrange
//        MenuItem vegItem = createMenuItem("Veggie Pizza", "Vegetarian pizza", 11.99, "Main", "veggie.jpg", "Cheese, Vegetables", true);
//        when(menuItemRepository.findByIsVegetarianTrue()).thenReturn(Arrays.asList(vegItem));
//
//        // Act
//        List<MenuItemResponseDTO> result = menuItemService.getVegetarian();
//
//        // Assert
//        assertThat(result).hasSize(1);
//        assertThat(result.get(0).getName()).isEqualTo("Veggie Pizza");
//        assertThat(result.get(0).isVegetarian()).isTrue();
//    }
//
//    @Test
//    void create_ValidRequest_ReturnsCreatedMenuItem(UUID uuid) {
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
//        MenuItem savedItem = createMenuItem("New Pizza", "Amazing pizza", 15.99, "Main", "new-pizza.jpg", "Cheese, Pepperoni", false);
//        savedItem.setId(UUID.randomUUID());
//        when(menuItemRepository.save(any(MenuItem.class))).thenReturn(savedItem);
//
//        // Act
//        MenuItemResponseDTO result = menuItemService.create(request);
//
//        // Assert
//        assertThat(result.getName()).isEqualTo("New Pizza");
//        assertThat(result.getDescription()).isEqualTo("Amazing pizza");
//        assertThat(result.getPrice()).isEqualTo(15.99);
//        assertThat(result.isVegetarian()).isFalse();
//        verify(menuItemRepository).save(any(MenuItem.class));
//    }
//
//    @Test
//    void update_MenuItemExists_ReturnsUpdatedMenuItem(UUID uuid) {
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
//        MenuItem updatedItem = createMenuItem("Updated Pizza", "Updated description", 16.99, "Main", "updated-pizza.jpg", "Cheese, Mushrooms", true);
//        updatedItem.setId(id);
//
//        when(menuItemRepository.existsById(id)).thenReturn(true);
//        when(menuItemRepository.save(any(MenuItem.class))).thenReturn(updatedItem);
//
//        // Act
//        MenuItemResponseDTO result = menuItemService.update(id, request);
//
//        // Assert
//        assertThat(result.getName()).isEqualTo("Updated Pizza");
//        assertThat(result.getId()).isEqualTo(id);
//        verify(menuItemRepository).save(any(MenuItem.class));
//    }
//
//    @Test
//    void update_MenuItemNotFound_ThrowsException(UUID uuid) {
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
//        when(menuItemRepository.existsById(id)).thenReturn(false);
//
//        // Act & Assert
//        assertThatThrownBy(() -> menuItemService.update(id, request))
//                .isInstanceOf(EntityNotFoundException.class)
//                .hasMessage("Menu item not found");
//    }
//
//    @Test
//    void delete_MenuItemExists_DeletesMenuItem(UUID uuid) {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        when(menuItemRepository.existsById(id)).thenReturn(true);
//
//        // Act
//        menuItemService.delete(id);
//
//        // Assert
//        verify(menuItemRepository).deleteById(id);
//    }
//
//    @Test
//    void delete_MenuItemNotFound_ThrowsException(UUID uuid) {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        when(menuItemRepository.existsById(id)).thenReturn(false);
//
//        // Act & Assert
//        assertThatThrownBy(() -> menuItemService.delete(id))
//                .isInstanceOf(EntityNotFoundException.class)
//                .hasMessage("Menu item not found");
//    }
//
//    private MenuItem createMenuItem(String name, String description, double price, String category, String imageUrl, String ingredients, boolean isVegetarian) {
//        MenuItem item = new MenuItem();
//        item.setName(name);
//        item.setDescription(description);
//        item.setPrice(BigDecimal.valueOf(price));
//        item.setCategory(category);
//        item.setImageUrl(imageUrl);
//        item.setIngredients(ingredients);
//        item.setVegetarian(isVegetarian);
//        return item;
//    }MenuItem() {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        MenuItem menuItem = createMenuItem("Pizza", "Delicious pizza", BigDecimal.valueOf(12.99), true);
//        menuItem.setId(id);
//        when(menuItemRepository.findById(id)).thenReturn(Optional.of(menuItem));
//
//        // Act
//        MenuItemResponseDTO result = menuItemService.getById(id);
//
//        // Assert
//        assertThat(result.getName()).isEqualTo("Pizza");
//        assertThat(result.getId()).isEqualTo(id);
//    }
//
//    @Test
//    void getById_MenuItemNotFound_ThrowsException() {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        when(menuItemRepository.findById(id)).thenReturn(Optional.empty());
//
//        // Act & Assert
//        assertThatThrownBy(() -> menuItemService.getById(id))
//                .isInstanceOf(EntityNotFoundException.class)
//                .hasMessage("Menu item not found");
//    }
//
//    @Test
//    void getVegetarian_ReturnsVegetarianItems() {
//        // Arrange
//        MenuItem vegItem = createMenuItem("Veggie Pizza", "Vegetarian pizza", BigDecimal.valueOf(11.99), true);
//        when(menuItemRepository.findByIsVegetarianTrue()).thenReturn(Arrays.asList(vegItem));
//
//        // Act
//        List<MenuItemResponseDTO> result = menuItemService.getVegetarian();
//
//        // Assert
//        assertThat(result).hasSize(1);
//        assertThat(result.get(0).getName()).isEqualTo("Veggie Pizza");
//        assertThat(result.get(0).isVegetarian()).isTrue();
//    }
//
//    @Test
//    void create_ValidRequest_ReturnsCreatedMenuItem() {
//        // Arrange
//        MenuItemRequestDTO request = new MenuItemRequestDTO("New Pizza", "Amazing pizza", BigDecimal.valueOf(15.99), true);
//        MenuItem savedItem = createMenuItem("New Pizza", "Amazing pizza", BigDecimal.valueOf(15.99), true);
//        savedItem.setId(UUID.randomUUID());
//        when(menuItemRepository.save(any(MenuItem.class))).thenReturn(savedItem);
//
//        // Act
//        MenuItemResponseDTO result = menuItemService.create(request);
//
//        // Assert
//        assertThat(result.getName()).isEqualTo("New Pizza");
//        assertThat(result.getDescription()).isEqualTo("Amazing pizza");
//        assertThat(result.getPrice()).isEqualTo(BigDecimal.valueOf(15.99));
//        assertThat(result.isVegetarian()).isTrue();
//        verify(menuItemRepository).save(any(MenuItem.class));
//    }
//
//    @Test
//    void update_MenuItemExists_ReturnsUpdatedMenuItem() {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        MenuItemRequestDTO request = new MenuItemRequestDTO("Updated Pizza", "Updated description", BigDecimal.valueOf(16.99), false);
//        MenuItem updatedItem = createMenuItem("Updated Pizza", "Updated description", BigDecimal.valueOf(16.99), false);
//        updatedItem.setId(id);
//
//        when(menuItemRepository.existsById(id)).thenReturn(true);
//        when(menuItemRepository.save(any(MenuItem.class))).thenReturn(updatedItem);
//
//        // Act
//        MenuItemResponseDTO result = menuItemService.update(id, request);
//
//        // Assert
//        assertThat(result.getName()).isEqualTo("Updated Pizza");
//        assertThat(result.getId()).isEqualTo(id);
//        verify(menuItemRepository).save(any(MenuItem.class));
//    }
//
//    @Test
//    void update_MenuItemNotFound_ThrowsException() {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        MenuItemRequestDTO request = new MenuItemRequestDTO("Updated Pizza", "Updated description", BigDecimal.valueOf(16.99), false);
//        when(menuItemRepository.existsById(id)).thenReturn(false);
//
//        // Act & Assert
//        assertThatThrownBy(() -> menuItemService.update(id, request))
//                .isInstanceOf(EntityNotFoundException.class)
//                .hasMessage("Menu item not found");
//    }
//
//    @Test
//    void delete_MenuItemExists_DeletesMenuItem() {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        when(menuItemRepository.existsById(id)).thenReturn(true);
//
//        // Act
//        menuItemService.delete(id);
//
//        // Assert
//        verify(menuItemRepository).deleteById(id);
//    }
//
//    @Test
//    void delete_MenuItemNotFound_ThrowsException() {
//        // Arrange
//        UUID id = UUID.randomUUID();
//        when(menuItemRepository.existsById(id)).thenReturn(false);
//
//        // Act & Assert
//        assertThatThrownBy(() -> menuItemService.delete(id))
//                .isInstanceOf(EntityNotFoundException.class)
//                .hasMessage("Menu item not found");
//    }
//
//    private MenuItem createMenuItem(String name, String description, BigDecimal price, boolean isVegetarian) {
//        MenuItem item = new MenuItem();
//        item.setName(name);
//        item.setDescription(description);
//        item.setPrice(price);
//        item.setVegetarian(isVegetarian);
//        return item;
//    }
//}
