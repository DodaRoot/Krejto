package com.krejto.server.service;

import com.krejto.server.exceptions.UserNotFound;
import com.krejto.server.exceptions.UserServiceExists;
import com.krejto.server.model.dto.LocationDTO;
import com.krejto.server.model.dto.ServiceDTO;
import com.krejto.server.model.dto.TypeOfServiceDTO;
import com.krejto.server.model.dto.UserDTO;
import com.krejto.server.model.entity.Location;
import com.krejto.server.model.entity.Service;
import com.krejto.server.model.entity.TypeOfService;
import com.krejto.server.model.entity.User;
import com.krejto.server.repository.LocationRepository;
import com.krejto.server.repository.ServiceRepository;
import com.krejto.server.repository.TypeOfServiceRepository;
import com.krejto.server.repository.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final TypeOfServiceRepository typeOfServiceRepository;

    public ServiceService(ServiceRepository serviceRepository, UserRepository userRepository, LocationRepository locationRepository, TypeOfServiceRepository typeOfServiceRepository) {
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
        this.typeOfServiceRepository = typeOfServiceRepository;
    }

    public List<ServiceDTO.GetServiceResponse> getServicesByQuery(ServiceDTO.GetServiceRequest getServiceRequest) {
        Specification<Service> specification = Specification.where(ServiceSpecifications.findByLocation(getServiceRequest.location())).and(ServiceSpecifications.findByTypeOfService(getServiceRequest.typeOfService())).and(ServiceSpecifications.findByPrice(getServiceRequest.priceStart(), getServiceRequest.priceEnd()));

        List<Service> services = serviceRepository.findAll(specification);
        List<ServiceDTO.GetServiceResponse> getServiceResponseList = new ArrayList<>();

        for (Service service : services) {
            ServiceDTO.GetServiceResponse getServiceResponse = getGetServiceResponse(service);
            getServiceResponseList.add(getServiceResponse);
        }

        return getServiceResponseList;
    }

    public List<ServiceDTO.GetServiceResponse> getServicesByUser(ServiceDTO.GetServiceByUserIdRequest getServiceByUserIdRequest) {
        List<Service> services = serviceRepository.findByUserId(getServiceByUserIdRequest.id());

        List<ServiceDTO.GetServiceResponse> getServiceResponseList = new ArrayList<>();

        for (Service service : services) {
            ServiceDTO.GetServiceResponse getServiceResponse = getGetServiceResponse(service);
            getServiceResponseList.add(getServiceResponse);
        }

        return getServiceResponseList;
    }

    public ServiceDTO.CreateServiceResponse createService(ServiceDTO.CreateServiceRequest createServiceRequest) {
        if (userRepository.findById(createServiceRequest.userId()).isEmpty()) {
            throw new UserNotFound("This user does not exist");
        }

        List<Service> userServices = serviceRepository.findByUserId(createServiceRequest.userId());

        for (Service serviceInUserServices : userServices) {
            if (serviceInUserServices.getTypeOfService().getId().equals(createServiceRequest.typeOfServiceId())) {
                throw new UserServiceExists("User already offers this service");
            }
        }

        User user = userRepository.findById(createServiceRequest.userId()).orElse(null);
        Location location = locationRepository.findById(createServiceRequest.locationId()).orElse(null);
        TypeOfService typeOfService = typeOfServiceRepository.findById(createServiceRequest.typeOfServiceId()).orElse(null);

        Service service = new Service(user, location, typeOfService, createServiceRequest.description(),createServiceRequest.price(), createServiceRequest.address());

        serviceRepository.save(service);

        return new ServiceDTO.CreateServiceResponse(service.getId(), service.getUser().getId(), service.getLocation().getId(), service.getTypeOfService().getId(), service.getDescription(), service.getPrice(), service.getAddress());
    }

    private static ServiceDTO.@NonNull GetServiceResponse getGetServiceResponse(Service service) {
        User user = service.getUser();
        Location location = service.getLocation();
        TypeOfService typeOfService = service.getTypeOfService();
        UserDTO.GetUserResponse getUserResponse = new UserDTO.GetUserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhoneNumber(), user.getCreatedAt());
        LocationDTO.GetLocationResponse getLocationResponse = new LocationDTO.GetLocationResponse(location.getId(), location.getLocation());
        TypeOfServiceDTO.GetTypeOfServiceResponse getTypeOfServiceResponse = new TypeOfServiceDTO.GetTypeOfServiceResponse(typeOfService.getId(), typeOfService.getServiceName(), typeOfService.getServiceDescription());
        return new ServiceDTO.GetServiceResponse(service.getId(), getUserResponse, getLocationResponse, getTypeOfServiceResponse, service.getDescription(), service.getPrice(), service.getAddress(), service.getServiceReviews());
    }
}
