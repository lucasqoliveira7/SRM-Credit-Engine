package com.srm.creditengine.service;

import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.repository.CurrencyRateRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CurrencyService {

    private final CurrencyRateRepository currencyRateRepository;

    public CurrencyService(CurrencyRateRepository currencyRateRepository) {
        this.currencyRateRepository = currencyRateRepository;
    }

    public BigDecimal convert(
            BigDecimal amount,
            CurrencyCode fromCurrency,
            CurrencyCode toCurrency,
            BigDecimal exchangeRate
    ) {
        if (fromCurrency == toCurrency) {
            return amount;
        }

        return amount
                .multiply(exchangeRate)
                .setScale(2, RoundingMode.HALF_UP);
    }
}