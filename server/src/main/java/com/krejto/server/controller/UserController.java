package com.krejto.server.controller;

import com.krejto.server.model.dto.UserDTO;
import com.krejto.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/loginSuccessful")
    public ResponseEntity<UserDTO.GetUserResponse> loggedInSuccessfully(Principal principal) {
        UserDTO.GetUserResponse getUserResponse = userService.getUserByEmail(principal);
        return ResponseEntity.ok(getUserResponse);
    }

    @GetMapping("/logoutSuccessful")
    public ResponseEntity loggedOutSuccessfully() {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO.GetUserResponse>> getAllUsers() {
        List<UserDTO.GetUserResponse> getUserResponses = userService.getAllUsers();
        return ResponseEntity.ok(getUserResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO.GetUserResponse> getUserById(@Valid @PathVariable UUID id) {
        UserDTO.GetUserResponse getUserResponse = userService.getUserById(id);
        return ResponseEntity.ok(getUserResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO.CreateUserResponse> createUser(@Valid @RequestBody UserDTO.CreateUserRequest user) {
        UserDTO.CreateUserResponse response = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody UserDTO.LoginUserRequest user) {
        String token = userService.validateUserLogin(user);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO.UpdateUserResponse> updateUser(@Valid @PathVariable UUID id, @Valid @RequestBody UserDTO.UpdateUserRequest updateUserRequest) {
        UserDTO.UpdateUserResponse updateUserResponse = userService.updateUser(id, updateUserRequest);
        return ResponseEntity.ok(updateUserResponse);
    }

    @PatchMapping
    public ResponseEntity<UserDTO.UpdateUserResponse> updateUser(@Valid @RequestBody UserDTO.UpdateUserRequest updateUserRequest, Principal principal) {
        UserDTO.UpdateUserResponse updateUserResponse = userService.updateUser(principal.getName(), updateUserRequest);
        return ResponseEntity.ok(updateUserResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> deleteUser(@Valid @PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteUser(Principal principal) {
        String email = principal.getName();
        userService.deleteUser(email);
        return ResponseEntity.noContent().build();
    }
}
