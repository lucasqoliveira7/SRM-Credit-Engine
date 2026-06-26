package com.srm.creditengine.dto;

import com.srm.creditengine.enums.CurrencyCode;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CurrencyRateRequest(

        @NotNull
        CurrencyCode fromCurrency,

        @NotNull
        CurrencyCode toCurrency,

        @NotNull
        @DecimalMin("0.00000001")
        BigDecimal rate,

        @NotNull
        LocalDate referenceDate

) {
}