package com.krejto.server.model.dto;

import java.util.UUID;

public class TypeOfServiceDTO {
    public record GetTypeOfServiceResponse (UUID id, String serviceName, String serviceDescription) {}

    public record CreateTypeOfServiceRequest (String serviceName, String serviceDescription) {}
    public record CreateTypeOfServiceResponse (UUID id, String serviceName, String serviceDescription) {}
}
