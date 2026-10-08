package com.krejto.server.model.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "SERVICE_REVIEWS")
public class ServiceReview {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "reviewer_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private String review;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public ServiceReview() {}

    public ServiceReview(User user, Service service, int rating, String review) {
        this.user = user;
        this.service = service;
        this.rating = rating;
        this.review = review;
    }

    public UUID getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Service getService() {
        return service;
    }

    public void setRating(int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        this.rating = rating;
    }

    public int getRating() {
        return rating;
    }

    public void setReview(String comment) {
        this.review = review;
    }

    public String getReview() {
        return review;
    }
}
