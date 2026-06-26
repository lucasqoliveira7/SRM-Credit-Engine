package com.srm.creditengine.service.pricing.strategy;

import com.srm.creditengine.entity.Receivable;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.temporal.ChronoUnit;

@Component
public class ChequeStrategy implements PricingStrategy {

    private static final BigDecimal BASE_RATE = new BigDecimal("0.01");
    private static final BigDecimal SPREAD = new BigDecimal("0.025");

    @Override
    public BigDecimal getSpread() {
        return SPREAD;
    }

    @Override
    public BigDecimal calculatePresentValue(Receivable receivable) {
        long days = ChronoUnit.DAYS.between(
                receivable.getCreatedAt().toLocalDate(),
                receivable.getDueDate()
        );

        BigDecimal months = BigDecimal.valueOf(days)
                .divide(BigDecimal.valueOf(30), 8, RoundingMode.HALF_UP);

        BigDecimal rate = BASE_RATE.add(SPREAD);

        double factor = Math.pow(
                BigDecimal.ONE.add(rate).doubleValue(),
                months.doubleValue()
        );

        return receivable.getFaceValue()
                .divide(BigDecimal.valueOf(factor), MathContext.DECIMAL64)
                .setScale(2, RoundingMode.HALF_UP);
    }
}