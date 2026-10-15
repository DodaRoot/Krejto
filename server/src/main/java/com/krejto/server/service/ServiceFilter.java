package com.krejto.server.service;

import com.krejto.server.model.entity.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Predicate;
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

    public List<Service> findByFilter (
            String description,
            String typeOfService,
            String location,
            BigDecimal priceStart,
            BigDecimal priceEnd
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

        criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()]));

        TypedQuery<Service> query = entityManager.createQuery(criteriaQuery);

        return query.getResultList();
    }
}
