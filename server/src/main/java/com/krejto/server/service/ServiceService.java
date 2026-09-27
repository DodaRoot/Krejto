package com.krejto.server.service;

import com.krejto.server.exceptions.ServiceNotFound;
import com.krejto.server.exceptions.UserNotFound;
import com.krejto.server.exceptions.UserServiceExists;
import com.krejto.server.model.dto.LocationDTO;
import com.krejto.server.model.dto.ServiceDTO;
import com.krejto.server.model.dto.TypeOfServiceDTO;
import com.krejto.server.model.dto.UserDTO;
import com.krejto.server.model.entity.*;
import com.krejto.server.repository.LocationRepository;
import com.krejto.server.repository.ServiceRepository;
import com.krejto.server.repository.TypeOfServiceRepository;
import com.krejto.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

        services.forEach(service -> getServiceResponseList.add(getGetServiceResponse(service)));

        return getServiceResponseList;
    }

    public List<ServiceDTO.GetServiceResponse> getServicesByUser(ServiceDTO.GetServiceByUserIdRequest getServiceByUserIdRequest) {
        List<Service> services = serviceRepository.findByUserId(getServiceByUserIdRequest.id());

        List<ServiceDTO.GetServiceResponse> getServiceResponseList = new ArrayList<>();

        services.forEach(service -> getServiceResponseList.add(getGetServiceResponse(service)));

        return getServiceResponseList;
    }

    public ServiceDTO.CreateServiceResponse createService(ServiceDTO.CreateServiceRequest createServiceRequest, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new UserNotFound(principal.getName()));

        List<Service> userServices = serviceRepository.findByUserId(user.getId());

        userServices.forEach(service -> {
            if (service.getTypeOfService().getId().equals(createServiceRequest.typeOfServiceId())) {
                throw new UserServiceExists("User already offers this service");
            }
        });

        Location location = locationRepository.findById(createServiceRequest.locationId()).orElse(null);
        TypeOfService typeOfService = typeOfServiceRepository.findById(createServiceRequest.typeOfServiceId()).orElse(null);

        Service service = new Service(user, location, typeOfService, createServiceRequest.description(),createServiceRequest.price(), createServiceRequest.address());

        serviceRepository.save(service);

        return new ServiceDTO.CreateServiceResponse(service.getId(), service.getUser().getId(), service.getLocation().getId(), service.getTypeOfService().getId(), service.getDescription(), service.getPrice(), service.getAddress());
    }

    @Transactional
    public ServiceDTO.UpdateServiceResponse updateService(UUID id, ServiceDTO.UpdateServiceRequest updateServiceRequest, Principal principal) {
        Service service = serviceRepository.findById(id).orElseThrow(() -> new ServiceNotFound("Service does not exist"));

        User user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new UserNotFound(principal.getName()));

        if (!service.getUser().getId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
            throw new ServiceNotFound("User does not own this service");
        }

        service.setLocation(locationRepository.findById(updateServiceRequest.locationId()).orElse(null));
        service.setTypeOfService(typeOfServiceRepository.findById(updateServiceRequest.typeOfServiceId()).orElse(null));
        service.setDescription(updateServiceRequest.description());
        service.setPrice(updateServiceRequest.price());
        service.setAddress(updateServiceRequest.address());

        return new ServiceDTO.UpdateServiceResponse(service.getId(), service.getUser().getId(), service.getLocation().getId(), service.getTypeOfService().getId(), service.getDescription(), service.getPrice(), service.getAddress());
    }

    public void deleteService(UUID id, Principal principal) {
        Service service = serviceRepository.findById(id).orElseThrow(() -> new ServiceNotFound("Service does not exist"));

        User user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new UserNotFound(principal.getName()));

        if (!service.getUser().getId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
            throw new ServiceNotFound("User does not own this service");
        }

        serviceRepository.deleteById(id);
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
