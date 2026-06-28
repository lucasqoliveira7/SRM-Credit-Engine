package com.srm.creditengine.service;

import com.srm.creditengine.dto.CurrencyRateRequest;
import com.srm.creditengine.entity.CurrencyRate;
import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.exception.ResourceNotFoundException;
import com.srm.creditengine.repository.CurrencyRateRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class CurrencyService {

    private final CurrencyRateRepository currencyRateRepository;

    public CurrencyService(CurrencyRateRepository currencyRateRepository) {
        this.currencyRateRepository = currencyRateRepository;
    }

    public BigDecimal convert(
            BigDecimal amount,
            CurrencyCode fromCurrency,
            CurrencyCode toCurrency,
            BigDecimal exchangeRate) {

        if (fromCurrency == toCurrency) {
            return amount;
        }

        return amount.multiply(exchangeRate);
    }

    public CurrencyRate updateRate(Long id, CurrencyRateRequest request) {
        CurrencyRate existing = currencyRateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Taxa de câmbio não encontrada."));

        existing.setRate(request.rate());
        existing.setReferenceDate(request.referenceDate());
        return currencyRateRepository.save(existing);
    }

    public CurrencyRate saveRate(CurrencyRateRequest request) {
        CurrencyRate rate = CurrencyRate.builder()
                .fromCurrency(request.fromCurrency().name())
                .toCurrency(request.toCurrency().name())
                .rate(request.rate())
                .referenceDate(request.referenceDate())
                .createdAt(LocalDateTime.now())
                .build();

        return currencyRateRepository.save(rate);
    }

    public CurrencyRate getLatestRate(CurrencyCode from, CurrencyCode to) {
        return currencyRateRepository
                .findTopByFromCurrencyAndToCurrencyOrderByReferenceDateDesc(
                        from.name(),
                        to.name()
                )
                .orElseThrow(() -> new ResourceNotFoundException("Taxa de câmbio não encontrada."));
    }

    public BigDecimal getExchangeRateValue(CurrencyCode from, CurrencyCode to) {
        if (from == to) {
            return BigDecimal.ONE;
        }

        return getLatestRate(from, to).getRate();
    }
}