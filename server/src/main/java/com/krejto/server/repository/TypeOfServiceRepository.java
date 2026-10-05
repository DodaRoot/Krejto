package com.krejto.server.repository;

import com.krejto.server.model.entity.TypeOfService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TypeOfServiceRepository extends JpaRepository<TypeOfService, UUID> {
    Optional<TypeOfService> findByServiceName(String serviceName);

    @Query("SELECT p, COUNT(c.id) FROM TypeOfService p LEFT JOIN p.services c GROUP BY p")
    List<Object[]> getParentsWithChildrenCount();
}
