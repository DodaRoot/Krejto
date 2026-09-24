package com.krejto.server.controller;

import com.krejto.server.model.dto.UserDTO;
import com.krejto.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO.GetUserResponse>> getAllUsers() {
        List<UserDTO.GetUserResponse> getUserResponses = userService.getAllUsers();
        return ResponseEntity.ok(getUserResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO.GetUserResponse> getUserById(@PathVariable UUID id) {
        UserDTO.GetUserResponse getUserResponse = userService.getUserById(id);
        return ResponseEntity.ok(getUserResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO.CreateUserResponse> createUser(@Valid @RequestBody UserDTO.CreateUserRequest user) {
        UserDTO.CreateUserResponse response = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserDTO.UpdateUserResponse> updateUser(@PathVariable UUID id, @Valid @RequestBody UserDTO.UpdateUserRequest updateUserRequest) {
        UserDTO.UpdateUserResponse updateUserResponse = userService.updateUser(id, updateUserRequest);
        return ResponseEntity.ok(updateUserResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUserById(@PathVariable UUID id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }
}
