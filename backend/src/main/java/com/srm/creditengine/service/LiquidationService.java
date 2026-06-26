package com.srm.creditengine.service;

import com.srm.creditengine.dto.LiquidationRequest;
import com.srm.creditengine.dto.LiquidationResponse;
import com.srm.creditengine.dto.LiquidationStatementResponse;
import com.srm.creditengine.entity.Cedent;
import com.srm.creditengine.entity.Receivable;
import com.srm.creditengine.entity.Settlement;
import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.enums.SettlementStatus;
import com.srm.creditengine.mapper.ReceivableMapper;
import com.srm.creditengine.mapper.SettlementMapper;
import com.srm.creditengine.repository.CedentRepository;
import com.srm.creditengine.repository.ReceivableRepository;
import com.srm.creditengine.repository.SettlementRepository;
import com.srm.creditengine.service.pricing.PricingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class LiquidationService {

    private final PricingService pricingService;
    private final CurrencyService currencyService;
    private final ReceivableMapper receivableMapper;
    private final SettlementMapper settlementMapper;
    private final CedentRepository cedentRepository;
    private final ReceivableRepository receivableRepository;
    private final SettlementRepository settlementRepository;

    public LiquidationService(
            PricingService pricingService,
            CurrencyService currencyService,
            ReceivableMapper receivableMapper,
            SettlementMapper settlementMapper,
            CedentRepository cedentRepository,
            ReceivableRepository receivableRepository,
            SettlementRepository settlementRepository
    ) {
        this.pricingService = pricingService;
        this.currencyService = currencyService;
        this.receivableMapper = receivableMapper;
        this.settlementMapper = settlementMapper;
        this.cedentRepository = cedentRepository;
        this.receivableRepository = receivableRepository;
        this.settlementRepository = settlementRepository;
    }

    @Transactional
    public LiquidationResponse liquidate(LiquidationRequest request) {

        Cedent cedent = cedentRepository.findByDocument(request.cedentDocument())
                .orElseGet(() -> cedentRepository.save(
                        Cedent.builder()
                                .name(request.cedentName())
                                .document(request.cedentDocument())
                                .createdAt(LocalDateTime.now())
                                .build()
                ));

        Receivable receivable = receivableMapper.toEntity(request, cedent);
        receivable = receivableRepository.save(receivable);

        BigDecimal presentValue = pricingService.calculatePresentValue(receivable);

        BigDecimal exchangeRate = currencyService.getExchangeRateValue(
                request.receivableCurrency(),
                request.paymentCurrency()
        );

        BigDecimal convertedValue = currencyService.convert(
                presentValue,
                request.receivableCurrency(),
                request.paymentCurrency(),
                exchangeRate
        );

        Settlement settlement = Settlement.builder()
                .receivable(receivable)
                .presentValue(convertedValue)
                .paymentCurrency(request.paymentCurrency())
                .exchangeRate(exchangeRate)
                .status(SettlementStatus.CONFIRMED)
                .settledAt(LocalDateTime.now())
                .build();

        settlement = settlementRepository.save(settlement);

        return settlementMapper.toResponse(settlement);
    }

    @Transactional(readOnly = true)
    public Page<LiquidationStatementResponse> getStatement(
            LocalDate startDate,
            LocalDate endDate,
            String cedentDocument,
            CurrencyCode currency,
            Pageable pageable
    ) {
        Specification<Settlement> spec = Specification.where(null);

        if (startDate != null) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(
                            root.get("settledAt"),
                            startDate.atStartOfDay()
                    )
            );
        }

        if (endDate != null) {
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(
                            root.get("settledAt"),
                            endDate.atTime(23, 59, 59)
                    )
            );
        }

        if (cedentDocument != null && !cedentDocument.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(
                            root.get("receivable").get("cedent").get("document"),
                            cedentDocument
                    )
            );
        }

        if (currency != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("paymentCurrency"), currency)
            );
        }

        return settlementRepository.findAll(spec, pageable)
                .map(settlementMapper::toStatementResponse);
    }
}