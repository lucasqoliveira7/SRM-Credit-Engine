package com.srm.creditengine.service.pricing.strategy;

import com.srm.creditengine.entity.Receivable;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class DuplicataStrategy implements PricingStrategy {

    private static final BigDecimal DISCOUNT_RATE = new BigDecimal("0.02");

    @Override
    public BigDecimal calculatePresentValue(Receivable receivable) {

        long days =
                ChronoUnit.DAYS.between(
                        LocalDate.now(),
                        receivable.getDueDate()
                );

        if (days < 0) {
            days = 0;
        }

        BigDecimal discount =
                receivable.getFaceValue()
                        .multiply(DISCOUNT_RATE)
                        .multiply(BigDecimal.valueOf(days))
                        .divide(BigDecimal.valueOf(30), 2, RoundingMode.HALF_UP);

        return receivable.getFaceValue().subtract(discount);
    }
}