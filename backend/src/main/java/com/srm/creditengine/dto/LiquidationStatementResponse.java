package com.srm.creditengine.dto;

import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.enums.ReceivableType;
import com.srm.creditengine.enums.SettlementStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LiquidationStatementResponse(

        Long settlementId,
        String cedentName,
        String cedentDocument,
        ReceivableType type,
        BigDecimal faceValue,
        BigDecimal presentValue,
        CurrencyCode receivableCurrency,
        CurrencyCode paymentCurrency,
        BigDecimal exchangeRate,
        SettlementStatus status,
        LocalDateTime settledAt

) {
}