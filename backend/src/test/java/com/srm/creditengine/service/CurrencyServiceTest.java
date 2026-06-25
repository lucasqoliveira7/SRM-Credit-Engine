package com.srm.creditengine.service;

import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.repository.CurrencyRateRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

class CurrencyServiceTest {

    private final CurrencyRateRepository currencyRateRepository =
            mock(CurrencyRateRepository.class);

    private final CurrencyService currencyService =
            new CurrencyService(currencyRateRepository);

    @Test
    void shouldReturnSameAmountWhenCurrenciesAreEqual() {
        BigDecimal result = currencyService.convert(
                new BigDecimal("1000.00"),
                CurrencyCode.BRL,
                CurrencyCode.BRL,
                BigDecimal.ONE
        );

        assertThat(result).isEqualByComparingTo(new BigDecimal("1000.00"));
    }

    @Test
    void shouldConvertAmountWhenCurrenciesAreDifferent() {
        BigDecimal result = currencyService.convert(
                new BigDecimal("1000.00"),
                CurrencyCode.USD,
                CurrencyCode.BRL,
                new BigDecimal("5.42")
        );

        assertThat(result).isEqualByComparingTo(new BigDecimal("5420.00"));
    }
}