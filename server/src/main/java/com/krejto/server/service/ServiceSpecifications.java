package com.krejto.server.service;

import com.krejto.server.model.entity.Service;
import org.springframework.data.jpa.domain.Specification;

public class ServiceSpecifications {

    public static Specification<Service> findByLocation(String location) {
        return (root, _, criteriaBuilder) -> criteriaBuilder.equal(root.get("location").get("location"), location);
    }

    public static Specification<Service> findByTypeOfService(String serviceName) {
        return (root, _, criteriaBuilder) -> criteriaBuilder.equal(root.get("typeOfService").get("serviceName"), serviceName);
    }

    public static Specification<Service> findByPrice(Double priceStart, Double priceEnd) {
        return (root, _, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), priceStart, priceEnd);
    }
}
