package com.srm.creditengine.dto;

import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.enums.ReceivableType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LiquidationRequest(

        @Schema(example = "Empresa ABC LTDA")
        @NotBlank
        String cedentName,

        @Schema(example = "12345678000190")
        @NotBlank
        String cedentDocument,

        @Schema(example = "DUPLICATA")
        @NotNull
        ReceivableType type,

        @Schema(example = "BRL")
        @NotNull
        CurrencyCode receivableCurrency,

        @Schema(example = "USD")
        @NotNull
        CurrencyCode paymentCurrency,

        @Schema(example = "10000.00")
        @NotNull
        @DecimalMin("0.01")
        BigDecimal faceValue,

        @Schema(example = "2026-08-30")
        @NotNull
        @Future
        LocalDate dueDate

) {
}