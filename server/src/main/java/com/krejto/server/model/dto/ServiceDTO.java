package com.krejto.server.model.dto;

import com.krejto.server.model.entity.ServiceReview;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class ServiceDTO {
    public record GetServiceRequest(
            @RequestParam(required = false)
            String description,
            @RequestParam(required = false)
            String location,
            @RequestParam(required = false)
            String typeOfService,
            @RequestParam(required = false)
            BigDecimal priceStart,
            @RequestParam(required = false)
            BigDecimal priceEnd) {}

    public record GetServiceResponse(UUID id, UserDTO.GetUserResponse getUserResponse, List<LocationDTO.GetLocationResponse> getLocationsResponses, TypeOfServiceDTO.GetTypeOfServiceResponse getTypeOfServiceResponse, String description, BigDecimal price, String address, List<ServiceReview> serviceReviews) {}

    public record CreateServiceRequest(
            @NotNull(message = "Location id is required")
            List<UUID> locationsIds,

            @NotNull(message = "Type Of Service id is required")
            UUID typeOfServiceId,

            @NotEmpty(message = "Description of service is required")
            String description,

            @NotNull(message = "Price is required")
            BigDecimal price,

            String address
    ) {}

    public record CreateServiceResponse(UUID id, UUID userId, List<UUID> locationsIds, UUID typeOfServiceId, String description, BigDecimal price, String address) {}

    public record UpdateServiceRequest(
            @NotNull(message = "Location id is required")
            List<UUID> locationsIds,

            @NotNull(message = "Type Of Service id is required")
            UUID typeOfServiceId,

            @NotEmpty(message = "Description of service is required")
            String description,

            @NotNull(message = "Price is required")
            BigDecimal price,

            String address ) {}

    public record UpdateServiceResponse(UUID id, UUID userId, List<UUID> locationsIds, UUID typeOfServiceId, String description, BigDecimal price, String address) {}
}
