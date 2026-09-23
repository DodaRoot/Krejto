package com.krejto.server.repository;

import com.krejto.server.model.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<Service, UUID>, JpaSpecificationExecutor<Service> {
    List<Service> findByUserId(UUID id);
}
