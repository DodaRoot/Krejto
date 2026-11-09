package com.krejto.server.service;

import com.krejto.server.exceptions.LocationOrTypesAlreadyExist;
import com.krejto.server.exceptions.LocationsOrTypesNonExistent;
import com.krejto.server.model.dto.LocationDTO;
import com.krejto.server.model.dto.TypeOfServiceDTO;
import com.krejto.server.model.entity.Location;
import com.krejto.server.model.entity.TypeOfService;
import com.krejto.server.repository.LocationRepository;
import com.krejto.server.repository.TypeOfServiceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LocationAndTypesOfServiceTests {
    @Mock
    private LocationRepository locationRepository;
    @Mock
    private TypeOfServiceRepository typeOfServiceRepository;
    @InjectMocks
    private LocationAndTypesOfService service;

    @Test
    void createLocationSavesNewLocation() {
        when(locationRepository.findByLocation("Central")).thenReturn(Optional.empty());

        LocationDTO.CreateLocationResponse response =
                service.createLocation(new LocationDTO.CreateLocationRequest("Central"));

        ArgumentCaptor<Location> locationCaptor = ArgumentCaptor.forClass(Location.class);
        verify(locationRepository).save(locationCaptor.capture());
        assertEquals("Central", locationCaptor.getValue().getLocation());
        assertEquals("Central", response.location());
    }

    @Test
    void createLocationRejectsExistingLocation() {
        when(locationRepository.findByLocation("Central")).thenReturn(Optional.of(new Location("Central")));

        assertThrows(LocationOrTypesAlreadyExist.class,
                () -> service.createLocation(new LocationDTO.CreateLocationRequest("Central")));

        verify(locationRepository, never()).save(any(Location.class));
    }

    @Test
    void createTypeOfServiceSavesNewType() {
        when(typeOfServiceRepository.findByServiceName("Plumbing")).thenReturn(Optional.empty());

        TypeOfServiceDTO.CreateTypeOfServiceResponse response = service.createTypeOfService(
                new TypeOfServiceDTO.CreateTypeOfServiceRequest("Plumbing", "Pipe repairs"));

        ArgumentCaptor<TypeOfService> typeCaptor = ArgumentCaptor.forClass(TypeOfService.class);
        verify(typeOfServiceRepository).save(typeCaptor.capture());
        assertEquals("Plumbing", typeCaptor.getValue().getServiceName());
        assertEquals("Pipe repairs", typeCaptor.getValue().getServiceDescription());
        assertEquals("Plumbing", response.serviceName());
    }

    @Test
    void getLocationsThrowsWhenRepositoryIsEmpty() {
        when(locationRepository.findAll()).thenReturn(List.of());

        assertThrows(LocationsOrTypesNonExistent.class, service::getLocations);
    }

    @Test
    void getLocationsMapsPersistedLocations() {
        Location location = new Location("Central");
        UUID id = UUID.randomUUID();
        ReflectionTestUtils.setField(location, "id", id);
        when(locationRepository.findAll()).thenReturn(List.of(location));

        List<LocationDTO.GetLocationResponse> response = service.getLocations();

        assertEquals(List.of(new LocationDTO.GetLocationResponse(id, "Central")), response);
    }

    @Test
    void getTypeOfServicesThrowsWhenRepositoryIsEmpty() {
        when(typeOfServiceRepository.findAll()).thenReturn(List.of());

        assertThrows(LocationsOrTypesNonExistent.class, service::getTypeOfServices);
    }

    @Test
    void getTopTypeOfServicesSortsByCountAndReturnsAtMostSix() {
        List<Object[]> rows = java.util.stream.IntStream.range(0, 7)
                .mapToObj(index -> new Object[]{
                        new TypeOfService("Type " + index, "Description " + index),
                        (long) index
                })
                .toList();
        when(typeOfServiceRepository.getParentsWithChildrenCount()).thenReturn(rows);

        List<TypeOfServiceDTO.GetTypeOfServiceResponseWithCount> response = service.getTopTypeOfServices();

        assertEquals(6, response.size());
        assertEquals("Type 6", response.getFirst().serviceName());
        assertEquals(6L, response.getFirst().relatedServices());
        assertEquals("Type 1", response.getLast().serviceName());
    }
}
