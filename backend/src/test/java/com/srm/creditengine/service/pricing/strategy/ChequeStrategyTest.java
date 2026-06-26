package com.srm.creditengine.service.pricing.strategy;

import com.srm.creditengine.entity.Receivable;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class ChequeStrategyTest {

    private final ChequeStrategy strategy = new ChequeStrategy();

    @Test
    void shouldCalculatePresentValueForCheque() {
        Receivable receivable = Receivable.builder()
                .faceValue(new BigDecimal("10000.00"))
                .dueDate(LocalDate.now().plusDays(30))
                .createdAt(LocalDateTime.now())
                .build();

        BigDecimal result = strategy.calculatePresentValue(receivable);

        assertThat(result).isEqualByComparingTo(new BigDecimal("9661.84"));
    }
}