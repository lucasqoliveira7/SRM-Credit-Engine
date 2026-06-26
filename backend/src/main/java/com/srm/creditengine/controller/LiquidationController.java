package com.srm.creditengine.controller;

import com.srm.creditengine.dto.LiquidationRequest;
import com.srm.creditengine.dto.LiquidationResponse;
import com.srm.creditengine.dto.LiquidationStatementResponse;
import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.service.LiquidationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/liquidations")
@Tag(name = "Liquidation", description = "Operações de liquidação de recebíveis")
public class LiquidationController {

    private final LiquidationService liquidationService;

    public LiquidationController(LiquidationService liquidationService) {
        this.liquidationService = liquidationService;
    }

    @PostMapping
    @Operation(
            summary = "Liquidar recebível",
            description = "Calcula o valor presente, aplica conversão cambial e grava a liquidação no banco."
    )
    public LiquidationResponse liquidate(@Valid @RequestBody LiquidationRequest request) {
        return liquidationService.liquidate(request);
    }

    @GetMapping
    @Operation(
            summary = "Consultar extrato de liquidações",
            description = "Consulta as liquidações realizadas com filtros opcionais e paginação."
    )
    public Page<LiquidationStatementResponse> getStatement(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate,

            @RequestParam(required = false)
            String cedentDocument,

            @RequestParam(required = false)
            CurrencyCode currency,

            @PageableDefault(size = 10)
            Pageable pageable
    ) {
        return liquidationService.getStatement(
                startDate,
                endDate,
                cedentDocument,
                currency,
                pageable
        );
    }
}