package com.krejto.server.repository;

import com.krejto.server.model.entity.TypeOfService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TypeOfServiceRepository extends JpaRepository<TypeOfService, UUID> {
}
