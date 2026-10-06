package com.krejto.server.repository;

import com.krejto.server.model.entity.Review;
import com.krejto.server.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReviewsRepository extends JpaRepository<Review, UUID> {
    Optional<Review> findByUser(User user);
}
