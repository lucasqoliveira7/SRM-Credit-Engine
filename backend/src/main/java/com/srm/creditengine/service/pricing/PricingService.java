package com.srm.creditengine.service.pricing;

import com.srm.creditengine.entity.Receivable;
import com.srm.creditengine.enums.ReceivableType;
import com.srm.creditengine.service.pricing.strategy.ChequeStrategy;
import com.srm.creditengine.service.pricing.strategy.DuplicataStrategy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PricingService {

    private final DuplicataStrategy duplicataStrategy;
    private final ChequeStrategy chequeStrategy;

    public PricingService(
            DuplicataStrategy duplicataStrategy,
            ChequeStrategy chequeStrategy) {

        this.duplicataStrategy = duplicataStrategy;
        this.chequeStrategy = chequeStrategy;
    }

    public BigDecimal calculatePresentValue(Receivable receivable) {

        if (receivable.getType() == ReceivableType.DUPLICATA) {
            return duplicataStrategy.calculatePresentValue(receivable);
        }

        if (receivable.getType() == ReceivableType.CHEQUE) {
            return chequeStrategy.calculatePresentValue(receivable);
        }

        throw new IllegalArgumentException("Tipo de recebível não suportado.");
    }

}