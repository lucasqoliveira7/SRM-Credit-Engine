package com.srm.creditengine.service.pricing.strategy;

import com.srm.creditengine.entity.Receivable;
import com.srm.creditengine.enums.ReceivableType;
import com.srm.creditengine.service.pricing.PricingService;
import com.srm.creditengine.service.pricing.strategy.ChequeStrategy;
import com.srm.creditengine.service.pricing.strategy.DuplicataStrategy;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class PricingServiceTest {

    private final PricingService pricingService =
            new PricingService(
                    new DuplicataStrategy(),
                    new ChequeStrategy()
            );

    @Test
    void shouldCalculateDuplicataPresentValue() {
        Receivable receivable = Receivable.builder()
                .type(ReceivableType.DUPLICATA)
                .faceValue(new BigDecimal("10000.00"))
                .dueDate(LocalDate.now().plusDays(30))
                .createdAt(LocalDateTime.now())
                .build();

        BigDecimal result = pricingService.calculatePresentValue(receivable);

        assertThat(result).isEqualByComparingTo(new BigDecimal("9756.10"));
    }

    @Test
    void shouldCalculateChequePresentValue() {
        Receivable receivable = Receivable.builder()
                .type(ReceivableType.CHEQUE)
                .faceValue(new BigDecimal("10000.00"))
                .dueDate(LocalDate.now().plusDays(30))
                .createdAt(LocalDateTime.now())
                .build();

        BigDecimal result = pricingService.calculatePresentValue(receivable);

        assertThat(result).isEqualByComparingTo(new BigDecimal("9661.84"));
    }

    @Test
    void shouldThrowExceptionWhenReceivableTypeIsNull() {
        Receivable receivable = Receivable.builder()
                .type(null)
                .faceValue(new BigDecimal("10000.00"))
                .dueDate(LocalDate.now().plusDays(30))
                .build();

        assertThatThrownBy(() -> pricingService.calculatePresentValue(receivable))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Tipo de recebível não suportado.");
    }
}