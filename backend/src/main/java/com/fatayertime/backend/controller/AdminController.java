package com.fatayertime.backend.controller;

import com.fatayertime.backend.model.MenuItem;
import com.fatayertime.backend.service.MenuItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final MenuItemService menuItemService;

    @Operation(summary = "Get current authenticated admin user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User info returned"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/me")
    public String getAdminInfo(@AuthenticationPrincipal UserDetails userDetails) {
        return "Logged in as: " + userDetails.getUsername();
    }

    @Operation(summary = "Get all menu items (admin only)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All menu items returned"),
            @ApiResponse(responseCode = "403", description = "Forbidden")
    })
    @GetMapping("/menuitems")
    public List<MenuItem> getAllMenuItems() {
        return menuItemService.getAllMenuItems();
    }

    @Operation(summary = "Example of a static MenuItem object")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Example menu item returned")
    })
    @GetMapping("/menuitems/example")
    public MenuItem getExampleItem() {
        return MenuItem.builder()
                .name("Falafel Fatayer")
                .description("Delicious falafel wrap with tahini")
                .price(4.99)
                .category("Vegetarian")
                .imageUrl("https://example.com/images/falafel.jpg")
                .ingredients("Falafel, lettuce, tomato, tahini")
                .build();
    }
}
