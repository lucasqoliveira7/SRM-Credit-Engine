package com.srm.creditengine.repository;

import com.srm.creditengine.entity.Cedent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CedentRepository extends JpaRepository<Cedent, Long> {

    Optional<Cedent> findByDocument(String document);

}