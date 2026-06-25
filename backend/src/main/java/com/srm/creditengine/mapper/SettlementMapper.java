package com.srm.creditengine.mapper;

import com.srm.creditengine.dto.LiquidationResponse;
import com.srm.creditengine.entity.Settlement;
import org.springframework.stereotype.Component;

@Component
public class SettlementMapper {

    public LiquidationResponse toResponse(Settlement settlement) {
        return new LiquidationResponse(
                settlement.getId(),
                settlement.getReceivable().getCedent().getName(),
                settlement.getReceivable().getType(),
                settlement.getReceivable().getFaceValue(),
                settlement.getPresentValue(),
                settlement.getReceivable().getCurrency(),
                settlement.getPaymentCurrency(),
                settlement.getExchangeRate(),
                settlement.getStatus(),
                settlement.getSettledAt()
        );
    }
}