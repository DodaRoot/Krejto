package com.krejto.server.service;

import com.krejto.server.exceptions.LocationOrTypesAlreadyExist;
import com.krejto.server.exceptions.LocationsOrTypesNonExistent;
import com.krejto.server.model.dto.LocationDTO;
import com.krejto.server.model.dto.TypeOfServiceDTO;
import com.krejto.server.model.entity.Location;
import com.krejto.server.model.entity.TypeOfService;
import com.krejto.server.repository.LocationRepository;
import com.krejto.server.repository.TypeOfServiceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationAndTypesOfService {
    private final LocationRepository locationRepository;
    private final TypeOfServiceRepository typeOfServiceRepository;

    public LocationAndTypesOfService(LocationRepository locationRepository, TypeOfServiceRepository typeOfServiceRepository) {
        this.locationRepository = locationRepository;
        this.typeOfServiceRepository = typeOfServiceRepository;
    }

    public List<LocationDTO.GetLocationResponse> getLocations() {
        if (locationRepository.findAll().isEmpty()) {
            throw new LocationsOrTypesNonExistent("Locations are empty");
        }

        List<Location> locations = locationRepository.findAll();
        List<LocationDTO.GetLocationResponse> locationDTOs = new ArrayList<>();

        locations.forEach(location -> locationDTOs.add(new LocationDTO.GetLocationResponse(location.getId(), location.getLocation())));

        return locationDTOs;
    }

    public List<TypeOfServiceDTO.GetTypeOfServiceResponse> getTypeOfServices() {
        if (typeOfServiceRepository.findAll().isEmpty()) {
            throw new LocationsOrTypesNonExistent("Types are empty");
        }
        List<TypeOfService> typeOfServices = typeOfServiceRepository.findAll();
        List<TypeOfServiceDTO.GetTypeOfServiceResponse> typeOfServicesDTOs = new ArrayList<>();

        typeOfServices.forEach(typeOfService ->  typeOfServicesDTOs.add(new TypeOfServiceDTO.GetTypeOfServiceResponse(typeOfService.getId(), typeOfService.getServiceName(), typeOfService.getServiceDescription())));

        return typeOfServicesDTOs;
    }

    public List<TypeOfServiceDTO.GetTypeOfServiceResponseWithCount> getTopTypeOfServices() {
        List<Object[]> typeOfServicesWithCount = typeOfServiceRepository.getParentsWithChildrenCount();

        if (typeOfServicesWithCount.isEmpty()) {
            throw new LocationsOrTypesNonExistent("Types Of Services are empty");
        }

        return typeOfServicesWithCount.stream()
                .sorted((a, b) -> Integer.compare((int) b[1], (int) a[1]))
                .limit(6)
                .map(row -> new TypeOfServiceDTO.GetTypeOfServiceResponseWithCount(
                        ((TypeOfService) row[0]).getId(),
                        ((TypeOfService) row[0]).getServiceName(),
                        ((TypeOfService) row[0]).getServiceDescription(),
                        (Long) row[1]
                ))
                .collect(Collectors.toList());
    }

    public LocationDTO.CreateLocationResponse createLocation(LocationDTO.CreateLocationRequest createLocationRequest) {
        if (locationRepository.findByLocation(createLocationRequest.location()).isPresent()) {
            throw new LocationOrTypesAlreadyExist("Location already exists");
        }
        Location location = new Location(createLocationRequest.location());
        locationRepository.save(location);
        return new LocationDTO.CreateLocationResponse(location.getId(), location.getLocation());
    }

    public TypeOfServiceDTO.CreateTypeOfServiceResponse createTypeOfService(TypeOfServiceDTO.CreateTypeOfServiceRequest createTypeOfServiceRequest) {
        if (typeOfServiceRepository.findByServiceName(createTypeOfServiceRequest.serviceName()).isPresent()) {
            throw new LocationOrTypesAlreadyExist("Type of Service already exists");
        }
        TypeOfService typeOfService = new TypeOfService(createTypeOfServiceRequest.serviceName(), createTypeOfServiceRequest.serviceDescription());
        typeOfServiceRepository.save(typeOfService);
        return new TypeOfServiceDTO.CreateTypeOfServiceResponse(typeOfService.getId(), typeOfService.getServiceName(), typeOfService.getServiceDescription());
    }
}
