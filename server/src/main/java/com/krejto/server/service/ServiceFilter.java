package com.krejto.server.service;

import com.krejto.server.model.entity.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ServiceFilter {
    private final EntityManager entityManager;
    public ServiceFilter(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Page<Service> findByFilter (
            String description,
            String typeOfService,
            String location,
            BigDecimal priceStart,
            BigDecimal priceEnd,
            Integer page,
            Integer size,
            String sort
    ) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Service> criteriaQuery = criteriaBuilder.createQuery(Service.class);
        Root<Service> serviceRoot = criteriaQuery.from(Service.class);
        List<Predicate> predicates = new ArrayList<>();

        if  (description != null) {
            Predicate descriptionPredicate = criteriaBuilder.like(criteriaBuilder.lower(serviceRoot.get("description")), "%"+description.toLowerCase()+"%");
            Predicate namePredicate = criteriaBuilder.like(criteriaBuilder.lower(serviceRoot.join("user").get("fullName")), "%"+description.toLowerCase()+"%");
            Predicate addressPredicate = criteriaBuilder.like(criteriaBuilder.lower(serviceRoot.get("address")), "%"+description.toLowerCase()+"%");
            predicates.add(criteriaBuilder.or(descriptionPredicate, namePredicate, addressPredicate));
        }
        if (typeOfService != null) {
            Predicate typeOfServicePredicate = criteriaBuilder.like(criteriaBuilder.lower(serviceRoot.join("typeOfService")
                    .get("serviceName")), "%"+typeOfService.toLowerCase()+"%");
            predicates.add(typeOfServicePredicate);
        }
        if (location != null) {
            Predicate locationPredicate = criteriaBuilder.like(criteriaBuilder.lower(serviceRoot.join("locations").get("location")), "%"+location.toLowerCase()+"%");
            predicates.add(locationPredicate);
        }
        if (priceStart != null) {
            Predicate priceStartPredicate = criteriaBuilder.greaterThan(serviceRoot.get("price"), priceStart);
            predicates.add(priceStartPredicate);
        }
        if (priceEnd != null) {
            Predicate priceEndPredicate = criteriaBuilder.lessThan(serviceRoot.get("price"), priceEnd);
            predicates.add(priceEndPredicate);
        }

        criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()]));

        TypedQuery<Service> query = entityManager.createQuery(criteriaQuery);

        Pageable pagable = PageRequest.of(page, size);

        List<Service> serviceList = query.setFirstResult((int) pagable.getOffset()).setMaxResults(pagable.getPageSize()).getResultList();

        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Service> countRoot = countQuery.from(Service.class);

        countQuery.select(criteriaBuilder.count(countRoot));

        long total = entityManager.createQuery(countQuery).getSingleResult();

        Page<Service> services = new PageImpl<>(serviceList, pagable, total);
        return services;
    }
}
