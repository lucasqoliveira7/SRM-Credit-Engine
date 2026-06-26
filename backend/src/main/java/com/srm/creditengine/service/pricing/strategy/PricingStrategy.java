package com.srm.creditengine.service.pricing.strategy;

import com.srm.creditengine.entity.Receivable;

import java.math.BigDecimal;

public interface PricingStrategy {

    BigDecimal getSpread();

    BigDecimal calculatePresentValue(Receivable receivable);

}