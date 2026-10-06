package com.krejto.server.model.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "REVIEWS")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private User user;

    @Column(nullable = false)
    private int stars;

    @Column(nullable = false)
    private String comment;

    public Review() {}

    public Review(User user, int stars, String comment) {
        this.user = user;
        this.stars = stars;
        this.comment = comment;
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

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        if (stars < 1 || stars > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        this.stars = stars;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return getId() + " " + getUser() + " " + getStars() + " " + getComment();
    }
}
