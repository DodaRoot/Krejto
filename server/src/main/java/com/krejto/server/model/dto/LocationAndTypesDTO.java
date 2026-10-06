package com.krejto.server.model.dto;

import java.util.List;

public class LocationAndTypesDTO {
    public record LocationAndTypesDTOList(List<LocationDTO.GetLocationResponse> locationDTO, List<TypeOfServiceDTO.GetTypeOfServiceResponse> typeOfServiceDTO) {}
}
