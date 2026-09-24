package com.krejto.server.model.dto;

import com.krejto.server.model.entity.ServiceReview;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

public class ServiceDTO {
    public record GetServiceByUserIdRequest(
            @PathVariable @NotEmpty(message = "Id cannot be empty") UUID id) {
    }

    public record GetServiceRequest(
            @NotEmpty @RequestParam
            String location,

            @NotEmpty @RequestParam
            String typeOfService,

            @NotNull @RequestParam
            Double priceStart,

            @NotNull @RequestParam
            Double priceEnd) {}

    public record GetServiceResponse(UUID id, UserDTO.GetUserResponse getUserResponse, LocationDTO.GetLocationResponse getLocationResponse, TypeOfServiceDTO.GetTypeOfServiceResponse getTypeOfServiceResponse, String description, Double price, String address, List<ServiceReview> serviceReviews) {}

    public record CreateServiceRequest(
            @NotNull(message = "User id is required")
            UUID userId,

            @NotNull(message = "Location id is required")
            UUID locationId,

            @NotNull(message = "Type Of Service id is required")
            UUID typeOfServiceId,

            @NotEmpty(message = "Description of service is required")
            String description,

            @NotNull(message = "Price is required")
            Double price,

            String address
    ) {}

    public record CreateServiceResponse(UUID id, UUID userId, UUID locationId, UUID typeOfServiceId, String description, Double price, String address) {}

    public record UpdateServiceRequest(
            @NotNull(message = "Id is required")
            UUID id,

            @NotNull(message = "Location id is required")
            UUID locationId,

            @NotNull(message = "Type Of Service id is required")
            UUID typeOfServiceId,

            @NotEmpty(message = "Description of service is required")
            String description,

            @NotNull(message = "Price is required")
            Double price,

            String address ) {}

    public record UpdateServiceResponse(UUID id, UUID userId, UUID locationId, UUID typeOfServiceId, String description, Double price, String address) {}
}
