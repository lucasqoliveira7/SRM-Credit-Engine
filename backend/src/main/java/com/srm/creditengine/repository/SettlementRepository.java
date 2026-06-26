package com.srm.creditengine.repository;

import com.srm.creditengine.entity.Settlement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SettlementRepository extends JpaRepository<Settlement, Long>,
        JpaSpecificationExecutor<Settlement> {
}