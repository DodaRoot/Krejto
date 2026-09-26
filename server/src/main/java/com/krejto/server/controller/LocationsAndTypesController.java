package com.krejto.server.controller;

import com.krejto.server.model.dto.LocationAndTypesDTO;
import com.krejto.server.model.dto.LocationDTO;
import com.krejto.server.model.dto.TypeOfServiceDTO;
import com.krejto.server.service.LocationAndTypesOfService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("api/v1/locationsAndTypes")
public class LocationsAndTypesController {
    LocationAndTypesOfService locationAndTypesOfService;

    LocationsAndTypesController(LocationAndTypesOfService locationAndTypesOfService) {
        this.locationAndTypesOfService = locationAndTypesOfService;
    }

    @GetMapping
    public ResponseEntity<LocationAndTypesDTO.LocationAndTypesDTOList> getLocationAndTypes() {
        List<LocationDTO.GetLocationResponse> locationsDTOs = locationAndTypesOfService.getLocations();
        List<TypeOfServiceDTO.GetTypeOfServiceResponse> typeOfServicesDTOs = locationAndTypesOfService.getTypeOfServices();

        LocationAndTypesDTO.LocationAndTypesDTOList locationAndTypesDTO = new LocationAndTypesDTO.LocationAndTypesDTOList(locationsDTOs, typeOfServicesDTOs);

        return ResponseEntity.ok().body(locationAndTypesDTO);
    }

    @PostMapping("/newLocation")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LocationDTO.CreateLocationResponse> createLocation(@Valid @RequestBody LocationDTO.CreateLocationRequest createLocationRequest) {
       LocationDTO.CreateLocationResponse createLocationResponse = locationAndTypesOfService.createLocation(createLocationRequest);
       return ResponseEntity.status(HttpStatus.CREATED).body(createLocationResponse);
    }

    @PostMapping("/newTypeOfService")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TypeOfServiceDTO.CreateTypeOfServiceResponse> createTypeOfService(@Valid @RequestBody TypeOfServiceDTO.CreateTypeOfServiceRequest createTypeOfServiceRequest) {
        TypeOfServiceDTO.CreateTypeOfServiceResponse createTypeOfServiceResponse = locationAndTypesOfService.createTypeOfService(createTypeOfServiceRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createTypeOfServiceResponse);
    }
}
