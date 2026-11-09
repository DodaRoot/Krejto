package com.krejto.server.service;

import com.krejto.server.config.securityFilterChain.JWTService;
import com.krejto.server.exceptions.RoleNotFound;
import com.krejto.server.exceptions.UserEmailAlreadyExists;
import com.krejto.server.exceptions.UserNotFound;
import com.krejto.server.model.dto.UserDTO;
import com.krejto.server.model.entity.Role;
import com.krejto.server.model.entity.User;
import com.krejto.server.repository.RoleRepository;
import com.krejto.server.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTests {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JWTService jwtService;
    @InjectMocks
    private UserService userService;

    private Role userRole;

    @BeforeEach
    void setUp() {
        userRole = new Role("USER");
    }

    @Test
    void createUserEncodesPasswordAndSavesUser() {
        UserDTO.CreateUserRequest request =
                new UserDTO.CreateUserRequest("Taylor Doe", "taylor@example.com", "plain", "555-0100");
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.password())).thenReturn("encoded");
        when(roleRepository.findByRole("USER")).thenReturn(Optional.of(userRole));

        UserDTO.CreateUserResponse response = userService.createUser(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();
        assertAll(
                () -> assertEquals("Taylor Doe", savedUser.getFullName()),
                () -> assertEquals("taylor@example.com", savedUser.getEmail()),
                () -> assertEquals("encoded", savedUser.getPassword()),
                () -> assertEquals("555-0100", savedUser.getPhoneNumber()),
                () -> assertEquals("USER", savedUser.getRole()),
                () -> assertEquals("Taylor Doe", response.fullName()),
                () -> assertEquals("taylor@example.com", response.email())
        );
    }

    @Test
    void createUserRejectsDuplicateEmailBeforeEncodingOrSaving() {
        UserDTO.CreateUserRequest request =
                new UserDTO.CreateUserRequest("Taylor Doe", "taylor@example.com", "plain", "555-0100");
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(new User()));

        assertThrows(UserEmailAlreadyExists.class, () -> userService.createUser(request));

        verifyNoInteractions(passwordEncoder, roleRepository);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void createUserFailsWhenUserRoleDoesNotExist() {
        UserDTO.CreateUserRequest request =
                new UserDTO.CreateUserRequest("Taylor Doe", "taylor@example.com", "plain", "555-0100");
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.password())).thenReturn("encoded");
        when(roleRepository.findByRole("USER")).thenReturn(Optional.empty());

        assertThrows(RoleNotFound.class, () -> userService.createUser(request));

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void getAllUsersMapsUsersToResponses() {
        User user = new User("Taylor Doe", "taylor@example.com", "hash", "555-0100", userRole);
        when(userRepository.findAll()).thenReturn(List.of(user));

        List<UserDTO.GetUserResponse> responses = userService.getAllUsers();

        assertEquals(1, responses.size());
        assertEquals("Taylor Doe", responses.getFirst().fullName());
        assertEquals("taylor@example.com", responses.getFirst().email());
    }

    @Test
    void getUserByIdThrowsWhenUserDoesNotExist() {
        UUID id = UUID.randomUUID();
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> userService.getUserById(id));
    }

    @Test
    void updateUserChangesProfileAndOnlyEncodesNonEmptyPassword() {
        UUID id = UUID.randomUUID();
        User user = new User("Old Name", "old@example.com", "old-hash", "555-0100", userRole);
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("new-password")).thenReturn("new-hash");
        UserDTO.UpdateUserRequest request =
                new UserDTO.UpdateUserRequest("New Name", "new@example.com", "555-0101", "new-password");

        UserDTO.UpdateUserResponse response = userService.updateUser(id, request);

        assertAll(
                () -> assertEquals("New Name", user.getFullName()),
                () -> assertEquals("new@example.com", user.getEmail()),
                () -> assertEquals("555-0101", user.getPhoneNumber()),
                () -> assertEquals("new-hash", user.getPassword()),
                () -> assertEquals("New Name", response.fullName())
        );
        verify(passwordEncoder).encode("new-password");
    }

    @Test
    void updateUserPreservesPasswordWhenPasswordIsEmpty() {
        UUID id = UUID.randomUUID();
        User user = new User("Old Name", "old@example.com", "old-hash", "555-0100", userRole);
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        UserDTO.UpdateUserRequest request =
                new UserDTO.UpdateUserRequest("New Name", "new@example.com", "555-0101", "");

        userService.updateUser(id, request);

        assertEquals("old-hash", user.getPassword());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    void validateUserLoginReturnsTokenForAuthenticatedUser() {
        UserDTO.LoginUserRequest request = new UserDTO.LoginUserRequest("taylor@example.com", "password");
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(request.email()).password("hash").authorities("ROLE_USER").build();
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(jwtService.generateToken(userDetails)).thenReturn("jwt-token");

        assertEquals("jwt-token", userService.validateUserLogin(request));
    }
}
