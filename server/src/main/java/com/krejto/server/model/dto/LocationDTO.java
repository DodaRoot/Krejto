package com.krejto.server.model.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.UUID;

public class LocationDTO {
    public record GetLocationResponse (UUID id, String location) {}

    public record CreateLocationRequest (@NotEmpty String location) {}
    public record CreateLocationResponse (UUID id, String location) {}
}
