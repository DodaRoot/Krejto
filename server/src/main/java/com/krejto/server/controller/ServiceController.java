package com.krejto.server.controller;

import com.krejto.server.model.dto.ServiceDTO;
import com.krejto.server.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/service")
public class ServiceController {
    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseEntity<List<ServiceDTO.GetServiceResponse>> getServicesByQuery(@Valid ServiceDTO.GetServiceRequest getServiceRequest) {
        List<ServiceDTO.GetServiceResponse> getServiceResponses = serviceService.getServicesByQuery(getServiceRequest);

        return ResponseEntity.status(HttpStatus.OK).body(getServiceResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ServiceDTO.GetServiceResponse>> getServicesByUser(@Valid ServiceDTO.GetServiceByUserIdRequest getServiceByUserIdRequest) {
        List<ServiceDTO.GetServiceResponse> getServiceResponses = serviceService.getServicesByUser(getServiceByUserIdRequest);

        return ResponseEntity.status(HttpStatus.OK).body(getServiceResponses);
    }

    @PostMapping
    public ResponseEntity<ServiceDTO.CreateServiceResponse> createService(@Valid @RequestBody ServiceDTO.CreateServiceRequest createServiceRequest) {
        ServiceDTO.CreateServiceResponse createServiceResponse = serviceService.createService(createServiceRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(createServiceResponse);
    }

    @PatchMapping
    public ResponseEntity<ServiceDTO.UpdateServiceResponse> updateService(@Valid @RequestBody ServiceDTO.UpdateServiceRequest updateServiceRequest) {
        ServiceDTO.UpdateServiceResponse updateServiceResponse = serviceService.updateService(updateServiceRequest);

        return ResponseEntity.ok(updateServiceResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteService(@PathVariable UUID id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
