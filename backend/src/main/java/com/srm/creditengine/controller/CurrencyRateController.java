package com.srm.creditengine.controller;

import com.srm.creditengine.dto.CurrencyRateRequest;
import com.srm.creditengine.entity.CurrencyRate;
import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.service.CurrencyService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/currency-rates")
public class CurrencyRateController {

    private final CurrencyService currencyService;

    public CurrencyRateController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @PostMapping
    public CurrencyRate saveRate(@Valid @RequestBody CurrencyRateRequest request) {
        return currencyService.saveRate(request);
    }

    @GetMapping("/latest")
    public CurrencyRate getLatestRate(
            @RequestParam CurrencyCode from,
            @RequestParam CurrencyCode to
    ) {
        return currencyService.getLatestRate(from, to);
    }
}