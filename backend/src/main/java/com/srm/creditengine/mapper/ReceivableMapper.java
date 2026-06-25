package com.srm.creditengine.mapper;

import com.srm.creditengine.dto.LiquidationRequest;
import com.srm.creditengine.dto.PricingSimulationRequest;
import com.srm.creditengine.entity.Cedent;
import com.srm.creditengine.entity.Receivable;
import com.srm.creditengine.enums.ReceivableStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ReceivableMapper {

    public Receivable toEntity(PricingSimulationRequest request) {
        return Receivable.builder()
                .type(request.type())
                .currency(request.currency())
                .faceValue(request.faceValue())
                .dueDate(request.dueDate())
                .status(ReceivableStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public Receivable toEntity(LiquidationRequest request, Cedent cedent) {
        return Receivable.builder()
                .cedent(cedent)
                .type(request.type())
                .currency(request.receivableCurrency())
                .faceValue(request.faceValue())
                .dueDate(request.dueDate())
                .status(ReceivableStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
    }
}