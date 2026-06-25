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

        @Schema(
                example = "Empresa ABC LTDA",
                description = "Nome da empresa cedente"
        )
        @NotBlank
        String cedentName,

        @Schema(
                example = "12345678000190",
                description = "CNPJ da empresa cedente"
        )
        @NotBlank
        String cedentDocument,

        @Schema(
                example = "DUPLICATA",
                description = "Tipo do recebível"
        )
        @NotNull
        ReceivableType type,

        @Schema(
                example = "BRL",
                description = "Moeda original do recebível"
        )
        @NotNull
        CurrencyCode receivableCurrency,

        @Schema(
                example = "USD",
                description = "Moeda utilizada na liquidação"
        )
        @NotNull
        CurrencyCode paymentCurrency,

        @Schema(
                example = "10000.00",
                description = "Valor de face do recebível"
        )
        @NotNull
        @DecimalMin("0.01")
        BigDecimal faceValue,

        @Schema(
                example = "5.42",
                description = "Cotação utilizada para conversão"
        )
        @NotNull
        @DecimalMin("0.00000001")
        BigDecimal exchangeRate,

        @Schema(
                example = "2026-08-30",
                description = "Data de vencimento"
        )
        @NotNull
        @Future
        LocalDate dueDate

) {
}