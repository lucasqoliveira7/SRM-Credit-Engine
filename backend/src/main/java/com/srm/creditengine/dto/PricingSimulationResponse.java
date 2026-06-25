package com.srm.creditengine.dto;

import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.enums.ReceivableType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;

public record PricingSimulationResponse(

        @Schema(example = "DUPLICATA", description = "Tipo do recebível")
        ReceivableType type,

        @Schema(example = "BRL", description = "Moeda do recebível")
        CurrencyCode currency,

        @Schema(example = "10000.00", description = "Valor de face informado")
        BigDecimal faceValue,

        @Schema(example = "9560.00", description = "Valor presente calculado")
        BigDecimal presentValue,

        @Schema(example = "2026-08-30", description = "Data de vencimento do recebível")
        LocalDate dueDate

) {
}