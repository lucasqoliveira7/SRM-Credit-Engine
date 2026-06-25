package com.srm.creditengine.service;

import com.srm.creditengine.dto.LiquidationRequest;
import com.srm.creditengine.entity.Cedent;
import com.srm.creditengine.entity.Receivable;
import com.srm.creditengine.entity.Settlement;
import com.srm.creditengine.enums.SettlementStatus;
import com.srm.creditengine.mapper.ReceivableMapper;
import com.srm.creditengine.repository.CedentRepository;
import com.srm.creditengine.repository.ReceivableRepository;
import com.srm.creditengine.repository.SettlementRepository;
import com.srm.creditengine.service.pricing.PricingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class LiquidationService {

    private final PricingService pricingService;
    private final CurrencyService currencyService;
    private final ReceivableMapper receivableMapper;
    private final CedentRepository cedentRepository;
    private final ReceivableRepository receivableRepository;
    private final SettlementRepository settlementRepository;

    public LiquidationService(
            PricingService pricingService,
            CurrencyService currencyService,
            ReceivableMapper receivableMapper,
            CedentRepository cedentRepository,
            ReceivableRepository receivableRepository,
            SettlementRepository settlementRepository) {
        this.pricingService = pricingService;
        this.currencyService = currencyService;
        this.receivableMapper = receivableMapper;
        this.cedentRepository = cedentRepository;
        this.receivableRepository = receivableRepository;
        this.settlementRepository = settlementRepository;
    }

    @Transactional
    public Settlement liquidate(LiquidationRequest request) {

        Cedent cedent = Cedent.builder()
                .name(request.cedentName())
                .document(request.cedentDocument())
                .createdAt(LocalDateTime.now())
                .build();

        cedent = cedentRepository.save(cedent);

        Receivable receivable = receivableMapper.toEntity(request, cedent);
        receivable = receivableRepository.save(receivable);

        BigDecimal presentValue = pricingService.calculatePresentValue(receivable);

        BigDecimal convertedValue = currencyService.convert(
                presentValue,
                request.receivableCurrency(),
                request.paymentCurrency(),
                request.exchangeRate()
        );

        Settlement settlement = Settlement.builder()
                .receivable(receivable)
                .presentValue(convertedValue)
                .paymentCurrency(request.paymentCurrency())
                .exchangeRate(request.exchangeRate())
                .status(SettlementStatus.CONFIRMED)
                .settledAt(LocalDateTime.now())
                .build();

        return settlementRepository.save(settlement);
    }
}