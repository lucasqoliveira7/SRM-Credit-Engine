-- =====================================================
-- SRM Credit Engine
-- Initial Database Schema
-- Version: 1
-- =====================================================

CREATE TABLE cedents (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    document VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE currency_rates (
    id BIGSERIAL PRIMARY KEY,
    from_currency VARCHAR(3) NOT NULL,
    to_currency VARCHAR(3) NOT NULL,
    rate NUMERIC(19,8) NOT NULL,
    reference_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_currency_rates_from_currency
        CHECK (from_currency IN ('BRL', 'USD')),

    CONSTRAINT chk_currency_rates_to_currency
        CHECK (to_currency IN ('BRL', 'USD')),

    CONSTRAINT chk_currency_rates_rate_positive
        CHECK (rate > 0),

    CONSTRAINT chk_currency_rates_different_currency
        CHECK (from_currency <> to_currency)
);

CREATE TABLE receivables (
    id BIGSERIAL PRIMARY KEY,
    cedent_id BIGINT NOT NULL,
    type VARCHAR(30) NOT NULL,
    face_value NUMERIC(19,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_receivables_cedents
        FOREIGN KEY (cedent_id)
        REFERENCES cedents(id),

    CONSTRAINT chk_receivables_type
        CHECK (type IN ('DUPLICATA', 'CHEQUE')),

    CONSTRAINT chk_receivables_currency
        CHECK (currency IN ('BRL', 'USD')),

    CONSTRAINT chk_receivables_status
        CHECK (status IN ('PENDING', 'PRICED', 'SETTLED', 'CANCELLED')),

    CONSTRAINT chk_receivables_face_value_positive
        CHECK (face_value > 0)
);

CREATE TABLE settlements (
    id BIGSERIAL PRIMARY KEY,
    receivable_id BIGINT NOT NULL,
    present_value NUMERIC(19,2) NOT NULL,
    payment_currency VARCHAR(3) NOT NULL,
    exchange_rate NUMERIC(19,8) NOT NULL,
    status VARCHAR(30) NOT NULL,
    settled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_settlements_receivables
        FOREIGN KEY (receivable_id)
        REFERENCES receivables(id),

    CONSTRAINT chk_settlements_payment_currency
        CHECK (payment_currency IN ('BRL', 'USD')),

    CONSTRAINT chk_settlements_status
        CHECK (status IN ('CREATED', 'CONFIRMED', 'CANCELLED')),

    CONSTRAINT chk_settlements_present_value_positive
        CHECK (present_value > 0),

    CONSTRAINT chk_settlements_exchange_rate_positive
        CHECK (exchange_rate IS NULL OR exchange_rate > 0)
);

CREATE INDEX idx_receivables_cedent_id
    ON receivables(cedent_id);

CREATE INDEX idx_receivables_status
    ON receivables(status);

CREATE INDEX idx_receivables_currency
    ON receivables(currency);

CREATE INDEX idx_receivables_due_date
    ON receivables(due_date);

CREATE INDEX idx_settlements_receivable_id
    ON settlements(receivable_id);

CREATE INDEX idx_settlements_settled_at
    ON settlements(settled_at);

CREATE INDEX idx_settlements_payment_currency
    ON settlements(payment_currency);

CREATE INDEX idx_currency_rates_pair_date
    ON currency_rates(from_currency, to_currency, reference_date);