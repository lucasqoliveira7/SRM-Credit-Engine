package com.srm.creditengine.dto;

import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.enums.ReceivableType;
import com.srm.creditengine.enums.SettlementStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LiquidationResponse(

        @Schema(example = "1", description = "Identificador da liquidação")
        Long settlementId,

        @Schema(example = "Empresa ABC LTDA", description = "Nome da empresa cedente")
        String cedentName,

        @Schema(example = "DUPLICATA", description = "Tipo do recebível")
        ReceivableType type,

        @Schema(example = "10000.00", description = "Valor de face")
        BigDecimal faceValue,

        @Schema(example = "9560.00", description = "Valor presente calculado")
        BigDecimal presentValue,

        @Schema(example = "BRL", description = "Moeda original")
        CurrencyCode receivableCurrency,

        @Schema(example = "USD", description = "Moeda da liquidação")
        CurrencyCode paymentCurrency,

        @Schema(example = "5.42", description = "Cotação aplicada")
        BigDecimal exchangeRate,

        @Schema(example = "CONFIRMED", description = "Status da liquidação")
        SettlementStatus status,

        @Schema(
                example = "2026-06-25T18:30:00",
                description = "Data e hora da liquidação"
        )
        LocalDateTime settledAt

) {
}