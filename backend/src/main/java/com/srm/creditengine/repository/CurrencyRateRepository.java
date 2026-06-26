package com.srm.creditengine.repository;

import com.srm.creditengine.entity.CurrencyRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CurrencyRateRepository extends JpaRepository<CurrencyRate, Long> {

    Optional<CurrencyRate> findTopByFromCurrencyAndToCurrencyOrderByReferenceDateDesc(
            String fromCurrency,
            String toCurrency
    );

}