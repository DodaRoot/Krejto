package com.krejto.server.repository;

import com.krejto.server.model.entity.SiteReview;
import com.krejto.server.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReviewsRepository extends JpaRepository<SiteReview, UUID> {
    Optional<SiteReview> findByUser(User user);
}
