package com.srm.creditengine.controller;

import com.srm.creditengine.dto.PricingSimulationRequest;
import com.srm.creditengine.dto.PricingSimulationResponse;
import com.srm.creditengine.entity.Receivable;
import com.srm.creditengine.mapper.ReceivableMapper;
import com.srm.creditengine.service.pricing.PricingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/pricing")
@Tag(name = "Pricing", description = "Operações de precificação de recebíveis")
public class PricingController {

    private final PricingService pricingService;
    private final ReceivableMapper receivableMapper;

    public PricingController(PricingService pricingService, ReceivableMapper receivableMapper) {
        this.pricingService = pricingService;
        this.receivableMapper = receivableMapper;
    }

    @PostMapping("/simulate")
    @Operation(
            summary = "Simular precificação",
            description = "Calcula o valor presente de um recebível sem gravar informações no banco de dados."
    )
    public PricingSimulationResponse simulate(@Valid @RequestBody PricingSimulationRequest request) {

        Receivable receivable = receivableMapper.toEntity(request);

        BigDecimal presentValue = pricingService.calculatePresentValue(receivable);

        return new PricingSimulationResponse(
                request.type(),
                request.currency(),
                request.faceValue(),
                presentValue,
                request.dueDate()
        );
    }
}