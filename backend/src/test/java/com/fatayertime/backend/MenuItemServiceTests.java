//package com.fatayertime.backend;
//
//import com.fatayertime.backend.model.MenuItem;
//import com.fatayertime.backend.repository.MenuItemRepository;
//import com.fatayertime.backend.service.MenuItemService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//
//import java.util.UUID;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@SpringBootTest
//@TestPropertySource(locations = "classpath:application-test.properties")
//class MenuItemServiceTests {
//
//    @Autowired
//    private MenuItemService service;
//
//    @Autowired
//    private MenuItemRepository repository;
//
//    @Test
//    void menuItemCrudOperations() {
//        MenuItem item = MenuItem.builder()
//                .name("Test Item")
//                .description("desc")
//                .price(1.0)
//                .category("TEST")
//                .imageUrl("img")
//                .ingredients("ing")
//                .isVegetarian(true)
//                .build();
//
//        MenuItem saved = service.createMenuItem(item);
//        UUID id = saved.getId();
//        assertThat(repository.existsById(id)).isTrue();
//
//        MenuItem fetched = service.getMenuItemById(id);
//        assertThat(fetched.getName()).isEqualTo("Test Item");
//
//        MenuItem update = new MenuItem();
//        update.setName("Updated Item");
//        update.setPrice(2.5);
//        MenuItem updated = service.updateMenuItem(id, update);
//
//        assertThat(updated.getName()).isEqualTo("Updated Item");
//        assertThat(updated.getPrice()).isEqualTo(2.5);
//
//        service.deleteMenuItem(id);
//        assertThat(repository.existsById(id)).isFalse();
//    }
//}
//
