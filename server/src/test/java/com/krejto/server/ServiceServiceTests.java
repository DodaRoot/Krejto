package com.krejto.server.service;

import com.krejto.server.exceptions.ServiceNotFound;
import com.krejto.server.exceptions.UserNotFound;
import com.krejto.server.exceptions.UserServiceExists;
import com.krejto.server.model.dto.ServiceDTO;
import com.krejto.server.model.entity.Location;
import com.krejto.server.model.entity.Role;
import com.krejto.server.model.entity.Service;
import com.krejto.server.model.entity.TypeOfService;
import com.krejto.server.model.entity.User;
import com.krejto.server.repository.LocationRepository;
import com.krejto.server.repository.ServiceRepository;
import com.krejto.server.repository.TypeOfServiceRepository;
import com.krejto.server.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceServiceTests {
    @Mock
    private ServiceRepository serviceRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private LocationRepository locationRepository;
    @Mock
    private TypeOfServiceRepository typeOfServiceRepository;
    @Mock
    private ServiceFilter serviceFilter;
    @InjectMocks
    private ServiceService serviceService;

    @Test
    void createServiceSavesServiceWithResolvedUserLocationAndType() {
        UUID userId = UUID.randomUUID();
        UUID locationId = UUID.randomUUID();
        UUID typeId = UUID.randomUUID();
        User user = user("taylor@example.com", userId, "USER");
        Location location = new Location("Central");
        ReflectionTestUtils.setField(location, "id", locationId);
        TypeOfService type = new TypeOfService("Plumbing", "Pipe repairs");
        ReflectionTestUtils.setField(type, "id", typeId);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(serviceRepository.findByUserId(userId)).thenReturn(List.of());
        when(locationRepository.findById(locationId)).thenReturn(Optional.of(location));
        when(typeOfServiceRepository.findById(typeId)).thenReturn(Optional.of(type));
        ServiceDTO.CreateServiceRequest request = new ServiceDTO.CreateServiceRequest(
                List.of(locationId), typeId, "Fix leaking pipe", new BigDecimal("125.00"), "1 Main St");

        ServiceDTO.CreateServiceResponse response =
                serviceService.createService(request, () -> user.getEmail());

        ArgumentCaptor<Service> serviceCaptor = ArgumentCaptor.forClass(Service.class);
        verify(serviceRepository).save(serviceCaptor.capture());
        Service savedService = serviceCaptor.getValue();
        assertAll(
                () -> assertSame(user, savedService.getUser()),
                () -> assertEquals(List.of(location), savedService.getLocations()),
                () -> assertSame(type, savedService.getTypeOfService()),
                () -> assertEquals("Fix leaking pipe", savedService.getDescription()),
                () -> assertEquals(new BigDecimal("125.00"), savedService.getPrice()),
                () -> assertEquals("1 Main St", savedService.getAddress()),
                () -> assertEquals(userId, response.userId()),
                () -> assertEquals(List.of(locationId), response.locationsIds()),
                () -> assertEquals(typeId, response.typeOfServiceId())
        );
    }

    @Test
    void createServiceRejectsDuplicateTypeForSameUser() {
        UUID userId = UUID.randomUUID();
        UUID typeId = UUID.randomUUID();
        User user = user("taylor@example.com", userId, "USER");
        TypeOfService type = new TypeOfService("Plumbing", "Pipe repairs");
        ReflectionTestUtils.setField(type, "id", typeId);
        Service existing = new Service(user, List.of(), type, "Existing", BigDecimal.TEN, null);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(serviceRepository.findByUserId(userId)).thenReturn(List.of(existing));
        ServiceDTO.CreateServiceRequest request = new ServiceDTO.CreateServiceRequest(
                List.of(), typeId, "Another", BigDecimal.ONE, null);

        assertThrows(UserServiceExists.class,
                () -> serviceService.createService(request, () -> user.getEmail()));

        verify(serviceRepository, never()).save(any(Service.class));
        verifyNoInteractions(locationRepository);
    }

    @Test
    void createServiceFailsWhenUserDoesNotExist() {
        when(userRepository.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> serviceService.createService(
                new ServiceDTO.CreateServiceRequest(List.of(), UUID.randomUUID(), "Service", BigDecimal.ONE, null),
                () -> "missing@example.com"));

        verifyNoInteractions(serviceRepository, locationRepository, typeOfServiceRepository);
    }

    @Test
    void updateServiceRejectsUserWhoDoesNotOwnService() {
        UUID serviceId = UUID.randomUUID();
        User owner = user("owner@example.com", UUID.randomUUID(), "USER");
        User otherUser = user("other@example.com", UUID.randomUUID(), "USER");
        Service existing = new Service(owner, List.of(), new TypeOfService("Plumbing", "Repairs"),
                "Existing", BigDecimal.TEN, null);
        when(serviceRepository.findById(serviceId)).thenReturn(Optional.of(existing));
        when(userRepository.findByEmail(otherUser.getEmail())).thenReturn(Optional.of(otherUser));

        assertThrows(ServiceNotFound.class, () -> serviceService.updateService(
                serviceId,
                new ServiceDTO.UpdateServiceRequest(List.of(), UUID.randomUUID(), "Updated", BigDecimal.ONE, null),
                () -> otherUser.getEmail()));

        verifyNoInteractions(locationRepository, typeOfServiceRepository);
    }

    @Test
    void deleteServiceDeletesServiceOwnedByCaller() {
        UUID serviceId = UUID.randomUUID();
        User owner = user("owner@example.com", UUID.randomUUID(), "USER");
        Service ownedService = new Service(owner, List.of(), new TypeOfService("Plumbing", "Repairs"),
                "Existing", BigDecimal.TEN, null);
        when(serviceRepository.findById(serviceId)).thenReturn(Optional.of(ownedService));
        when(userRepository.findByEmail(owner.getEmail())).thenReturn(Optional.of(owner));

        serviceService.deleteService(serviceId, () -> owner.getEmail());

        verify(serviceRepository).deleteById(serviceId);
    }

    @Test
    void deleteServiceRejectsNonOwner() {
        UUID serviceId = UUID.randomUUID();
        User owner = user("owner@example.com", UUID.randomUUID(), "USER");
        User otherUser = user("other@example.com", UUID.randomUUID(), "USER");
        Service ownedService = new Service(owner, List.of(), new TypeOfService("Plumbing", "Repairs"),
                "Existing", BigDecimal.TEN, null);
        when(serviceRepository.findById(serviceId)).thenReturn(Optional.of(ownedService));
        when(userRepository.findByEmail(otherUser.getEmail())).thenReturn(Optional.of(otherUser));

        assertThrows(ServiceNotFound.class,
                () -> serviceService.deleteService(serviceId, () -> otherUser.getEmail()));

        verify(serviceRepository, never()).deleteById(any());
    }

    private static User user(String email, UUID id, String roleName) {
        User user = new User("Taylor Doe", email, "hash", "555-0100", new Role(roleName));
        ReflectionTestUtils.setField(user, "id", id);
        return user;
    }
}
