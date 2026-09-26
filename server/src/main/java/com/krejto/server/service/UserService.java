package com.krejto.server.service;

import com.krejto.server.exceptions.RoleNotFound;
import com.krejto.server.exceptions.UserEmailAlreadyExists;
import com.krejto.server.exceptions.UserNotFound;
import com.krejto.server.model.dto.UserDTO;
import com.krejto.server.model.entity.User;
import com.krejto.server.repository.RoleRepository;
import com.krejto.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public List<UserDTO.GetUserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserDTO.GetUserResponse> getUserResponses = new ArrayList<>();

        for (User user : users) {
            UserDTO.GetUserResponse getUserResponse = new UserDTO.GetUserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhoneNumber(), user.getCreatedAt());
            getUserResponses.add(getUserResponse);
        }

        return getUserResponses;
    }

    public UserDTO.GetUserResponse getUserById(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFound("User with id " + id + " not found"));

        return new UserDTO.GetUserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhoneNumber(), user.getCreatedAt());
    }

    public UserDTO.CreateUserResponse createUser(UserDTO.CreateUserRequest createUserRequest) {
        if (userRepository.findByEmail(createUserRequest.email()).isPresent()) {
            throw new UserEmailAlreadyExists("Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(createUserRequest.password());

        User user = new User(createUserRequest.fullName(), createUserRequest.email(), encodedPassword, createUserRequest.phoneNumber(), roleRepository.findByRole("USER").orElseThrow(() -> new RoleNotFound("Role not found")));

        userRepository.save(user);

        return new UserDTO.CreateUserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhoneNumber(), user.getCreatedAt());
    }

    @Transactional
    public UserDTO.UpdateUserResponse updateUser(UUID id, UserDTO.UpdateUserRequest updateUserRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));

        user.setFullName(updateUserRequest.fullName());
        user.setEmail(updateUserRequest.email());
        user.setPhoneNumber(updateUserRequest.phoneNumber());

        if (updateUserRequest.password() != null && !updateUserRequest.password().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updateUserRequest.password()));
        }

        return new UserDTO.UpdateUserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhoneNumber());
    }

    @Transactional
    public UserDTO.UpdateUserResponse updateUser(String email, UserDTO.UpdateUserRequest updateUserRequest) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFound("User not found"));

        user.setFullName(updateUserRequest.fullName());
        user.setEmail(updateUserRequest.email());
        user.setPhoneNumber(updateUserRequest.phoneNumber());

        if (updateUserRequest.password() != null && !updateUserRequest.password().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updateUserRequest.password()));
        }

        return new UserDTO.UpdateUserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhoneNumber());
    }

    public void deleteUser(UUID id) {
        userRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));

        userRepository.deleteById(id);
    }

    public void deleteUser(String email) {
        UUID id = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFound("User not found")).getId();

        userRepository.deleteById(id);
    }
}
