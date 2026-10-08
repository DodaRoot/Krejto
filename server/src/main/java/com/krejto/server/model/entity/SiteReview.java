package com.krejto.server.model.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "SITE_REVIEWS")
public class SiteReview {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "reviewer_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private String review;

    public SiteReview() {}

    public SiteReview(User user, int rating, String review) {
        this.user = user;
        this.rating = rating;
        this.review = review;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String comment) {
        this.review = comment;
    }

    @Override
    public String toString() {
        return getId() + " " + getUser() + " " + getRating() + " " + getReview();
    }
}
