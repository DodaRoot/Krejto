package com.krejto.server.model.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.UUID;

public class TypeOfServiceDTO {
    public record GetTypeOfServiceResponse (UUID id, String serviceName, String serviceDescription) {}
    public record GetTypeOfServiceResponseWithCount (UUID id, String serviceName, String serviceDescription, Long relatedServices) {}

    public record CreateTypeOfServiceRequest (@NotEmpty String serviceName, @NotEmpty String serviceDescription) {}
    public record CreateTypeOfServiceResponse (UUID id, String serviceName, String serviceDescription) {}
}
