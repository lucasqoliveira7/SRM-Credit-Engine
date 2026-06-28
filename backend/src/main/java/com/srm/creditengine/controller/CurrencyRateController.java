package com.srm.creditengine.controller;

import com.srm.creditengine.dto.CurrencyRateRequest;
import com.srm.creditengine.entity.CurrencyRate;
import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.service.CurrencyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Currency Rates", description = "Gestão de taxas de câmbio")
@RestController
@RequestMapping("/api/currency-rates")
public class CurrencyRateController {

    private final CurrencyService currencyService;

    public CurrencyRateController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @Operation(summary = "Registrar nova taxa de câmbio")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CurrencyRate saveRate(@Valid @RequestBody CurrencyRateRequest request) {
        return currencyService.saveRate(request);
    }

    @Operation(summary = "Atualizar taxa de câmbio existente")
    @PutMapping("/{id}")
    public CurrencyRate updateRate(
            @PathVariable Long id,
            @Valid @RequestBody CurrencyRateRequest request
    ) {
        return currencyService.updateRate(id, request);
    }

    @Operation(summary = "Consultar taxa de câmbio vigente")
    @GetMapping("/latest")
    public CurrencyRate getLatestRate(
            @RequestParam CurrencyCode from,
            @RequestParam CurrencyCode to
    ) {
        return currencyService.getLatestRate(from, to);
    }
}