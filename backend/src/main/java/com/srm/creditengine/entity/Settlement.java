package com.srm.creditengine.entity;

import com.srm.creditengine.enums.CurrencyCode;
import com.srm.creditengine.enums.SettlementStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "settlements")
public class Settlement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receivable_id", nullable = false)
    private Receivable receivable;

    @Column(name = "present_value", nullable = false, precision = 19, scale = 2)
    private BigDecimal presentValue;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_currency", nullable = false, length = 3)
    private CurrencyCode paymentCurrency;

    @Column(name = "exchange_rate", nullable = false, precision = 19, scale = 8)
    private BigDecimal exchangeRate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private SettlementStatus status;

    @Column(name = "settled_at", nullable = false)
    private LocalDateTime settledAt;

}