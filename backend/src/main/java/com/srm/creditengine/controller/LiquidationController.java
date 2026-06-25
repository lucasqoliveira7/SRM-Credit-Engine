package com.srm.creditengine.controller;

import com.srm.creditengine.dto.LiquidationRequest;
import com.srm.creditengine.dto.LiquidationResponse;
import com.srm.creditengine.entity.Settlement;
import com.srm.creditengine.mapper.SettlementMapper;
import com.srm.creditengine.service.LiquidationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/liquidations")
@Tag(name = "Liquidation", description = "Operações de liquidação de recebíveis")
public class LiquidationController {

    private final LiquidationService liquidationService;
    private final SettlementMapper settlementMapper;

    public LiquidationController(
            LiquidationService liquidationService,
            SettlementMapper settlementMapper) {
        this.liquidationService = liquidationService;
        this.settlementMapper = settlementMapper;
    }

    @PostMapping
    @Operation(
            summary = "Liquidar recebível",
            description = "Calcula o valor presente, aplica conversão cambial e grava a liquidação no banco."
    )
    public LiquidationResponse liquidate(@Valid @RequestBody LiquidationRequest request) {

        Settlement settlement = liquidationService.liquidate(request);

        return settlementMapper.toResponse(settlement);
    }
}