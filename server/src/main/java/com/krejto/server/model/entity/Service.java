package com.krejto.server.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "SERVICES")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "type_of_service_id", nullable = false)
    private TypeOfService typeOfService;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String address;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceReview> serviceReviews = new ArrayList<>();

    public Service() {}

    public Service(User user, Location location, TypeOfService typeOfService, String description, BigDecimal price, String address) {
        this.user = user;
        this.location = location;
        this.typeOfService = typeOfService;
        this.description = description;
        this.price = price;
        this.address = address;
    }

    public UUID getId() {
        return id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Location getLocation() {
        return location;
    }

    public void setTypeOfService(TypeOfService typeOfService) {
        this.typeOfService = typeOfService;
    }

    public TypeOfService getTypeOfService() {
        return typeOfService;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setServiceReviews(List<ServiceReview> serviceReviews) {
        this.serviceReviews = serviceReviews;
    }

    public List<ServiceReview> getServiceReviews() {
        return serviceReviews;
    }
}
