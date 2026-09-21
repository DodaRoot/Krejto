package com.krejto.server.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;
import java.util.UUID;

public class UserDTO {
    public record GetUserResponse(UUID id, String fullName, String email, String phoneNumber, LocalDateTime createdAt) {}

    public record CreateUserRequest (
            @NotEmpty(message = "Full name is required")
            String fullName,

            @NotEmpty(message = "Email should not be empty")
            @Email(message = "Valid email is required")
            String email,

            @NotEmpty(message = "Password should not be empty")
            String password,

            @NotEmpty(message = "Phone Number should not be empty")
            String phoneNumber) {}

    public record CreateUserResponse (UUID id, String fullName, String email, String phoneNumber, LocalDateTime createdAt) {}

    public record UpdateUserRequest (
            @NotEmpty(message = "Full name should not be empty")
            String fullName,

            @NotEmpty(message = "Email should not be empty")
            String email,

            @NotEmpty(message = "Phone Number should not be empty")
            String phoneNumber) {}

    public record UpdateUserResponse (String fullName, String email, String phoneNumber) {}
}

