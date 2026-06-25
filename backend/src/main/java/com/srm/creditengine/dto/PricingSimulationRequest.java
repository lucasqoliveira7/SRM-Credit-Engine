package com.srm.creditengine.dto;

import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.enums.ReceivableType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
public record PricingSimulationRequest(

        @Schema(example = "DUPLICATA", description = "Tipo do recebível")
        @NotNull
        ReceivableType type,

        @Schema(example = "BRL", description = "Moeda do recebível")
        @NotNull
        CurrencyCode currency,

        @Schema(example = "10000.00", description = "Valor de face do recebível")
        @NotNull
        @DecimalMin("0.01")
        BigDecimal faceValue,

        @Schema(example = "2026-08-30", description = "Data de vencimento do recebível")
        @NotNull
        @Future
        LocalDate dueDate

) {
}