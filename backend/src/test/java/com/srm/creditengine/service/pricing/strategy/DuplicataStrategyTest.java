package com.srm.creditengine.service.pricing.strategy;

import com.srm.creditengine.entity.Receivable;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class DuplicataStrategyTest {

    private final DuplicataStrategy strategy = new DuplicataStrategy();

    @Test
    void shouldCalculatePresentValueForDuplicata() {
        Receivable receivable = Receivable.builder()
                .faceValue(new BigDecimal("10000.00"))
                .dueDate(LocalDate.now().plusDays(30))
                .createdAt(LocalDateTime.now())
                .build();

        BigDecimal result = strategy.calculatePresentValue(receivable);

        assertThat(result).isEqualByComparingTo(new BigDecimal("9756.10"));
    }
}