# DIAGRAMA ER - SRM Credit Engine

## Entidades

### CEDENTS

Representa a empresa cedente que vende recebíveis para o fundo.

| Campo | Tipo | Descrição |
|---|---|---|
| id | BIGSERIAL | Identificador único |
| name | VARCHAR(150) | Nome da empresa cedente |
| document | VARCHAR(20) | CNPJ ou documento identificador |
| created_at | TIMESTAMP | Data de criação |

---

### RECEIVABLES

Representa o recebível negociado.

| Campo | Tipo | Descrição |
|---|---|---|
| id | BIGSERIAL | Identificador único |
| cedent_id | BIGINT | Cedente dono do recebível |
| type | VARCHAR(30) | Tipo do recebível |
| face_value | NUMERIC(19,2) | Valor de face |
| currency | VARCHAR(3) | Moeda do recebível |
| due_date | DATE | Data de vencimento |
| status | VARCHAR(30) | Status do recebível |
| created_at | TIMESTAMP | Data de criação |

---

### CURRENCY_RATES

Armazena taxas de câmbio.

| Campo | Tipo | Descrição |
|---|---|---|
| id | BIGSERIAL | Identificador único |
| from_currency | VARCHAR(3) | Moeda origem |
| to_currency | VARCHAR(3) | Moeda destino |
| rate | NUMERIC(19,8) | Taxa de conversão |
| reference_date | DATE | Data de referência |
| created_at | TIMESTAMP | Data de criação |

---

### SETTLEMENTS

Representa a liquidação financeira do recebível.

| Campo | Tipo | Descrição |
|---|---|---|
| id | BIGSERIAL | Identificador único |
| receivable_id | BIGINT | Recebível liquidado |
| present_value | NUMERIC(19,2) | Valor presente calculado |
| payment_currency | VARCHAR(3) | Moeda de pagamento |
| exchange_rate | NUMERIC(19,8) | Taxa usada na conversão |
| status | VARCHAR(30) | Status da liquidação |
| settled_at | TIMESTAMP | Data da liquidação |
| version | BIGINT | Versão para Optimistic Locking |

---

## Relacionamentos

```text
CEDENTS 1 ─── N RECEIVABLES 1 ─── N SETTLEMENTS

CURRENCY_RATES é consultada durante operações cross-currency.