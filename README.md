# SRM Credit Engine

Sistema desenvolvido como solução para o desafio técnico da **SRM Asset**, simulando uma plataforma de cessão de crédito multimoedas capaz de precificar recebíveis, realizar liquidações financeiras e consultar históricos de operações de forma segura, auditável e escalável.

---

# Objetivo

O SRM Credit Engine permite:

* Simular a precificação de recebíveis.
* Liquidar operações em BRL e USD.
* Aplicar conversão cambial.
* Calcular valor presente utilizando regras específicas para cada tipo de recebível.
* Consultar o histórico de liquidações com paginação e filtros.

---

# Tecnologias Utilizadas

## Backend

* Java 21
* Spring Boot 3
* Spring Data JPA
* PostgreSQL
* Flyway
* Maven
* Swagger / OpenAPI

## Frontend

* React
* Vite
* Material UI
* Axios

---

# Arquitetura

O backend foi desenvolvido utilizando arquitetura em camadas:

```text
Controller
↓

Service

↓

Repository

↓

PostgreSQL
```

A lógica de precificação utiliza o padrão **Strategy Pattern**, permitindo adicionar novos tipos de recebíveis sem alterar o motor principal de cálculo.

---

# Funcionalidades

## Simulação de Precificação

Permite calcular o valor presente de um recebível considerando:

* Tipo do recebível
* Valor de face
* Data de vencimento
* Moeda

---

## Liquidação

Realiza:

* Cadastro do cedente
* Cadastro do recebível
* Conversão cambial
* Persistência da liquidação
* Retorno dos dados da operação

---

## Extrato

Consulta de liquidações com:

* Paginação Server-Side
* Filtro por período
* Filtro por documento
* Filtro por moeda

---

# Motor Cambial

O sistema suporta operações entre:

* BRL
* USD

As taxas são armazenadas no banco e utilizadas durante a liquidação.

---

# Banco de Dados

Modelo relacional composto pelas entidades:

* Cedents
* Receivables
* Settlements
* Currency Rates

Os scripts SQL encontram-se em:

```text
docs/DDL.sql
```

O diagrama ER encontra-se em:

```text
docs/ER_DIAGRAM.md
```

---

# Estrutura do Projeto

```text
SRM-Credit-Engine
│
├── backend
│
├── frontend
│
├── docs
│   ├── DDL.sql
│   ├── DER.md
│   └── ER_DIAGRAM.md
│
├── docker-compose.yml
│
├── README.md
│
└── AI_USAGE.md
```

---

# Endpoints

## Precificação

```http
POST /api/pricing/simulate
```

---

## Liquidação

```http
POST /api/liquidations
```

---

## Extrato

```http
GET /api/liquidations
```

---

## Câmbio

```http
GET /api/currency-rates
```

```http
PUT /api/currency-rates
```

---

# Swagger

Após iniciar o backend:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# Como Executar

## Com Docker (recomendado)

```bash
docker compose up -d
```

Todos os serviços sobem juntos: banco, backend e frontend.

| Serviço | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend / Swagger | http://localhost:8080/swagger-ui/index.html |
| PostgreSQL | localhost:5432 |

---

## Sem Docker (desenvolvimento local)

### Banco

```bash
docker compose up postgres
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

---

# Padrões Utilizados

* SOLID
* Strategy Pattern
* DTO Pattern
* Mapper Pattern
* Repository Pattern
* REST API
* Exception Handler Global
* Optimistic Locking (controle de concorrência em liquidações)

---

# Funcionalidades Implementadas

* Gestão de Câmbio
* Simulação de Precificação
* Liquidação Financeira
* Conversão Cambial
* Extrato de Liquidações
* Paginação
* Filtros
* Swagger
* Flyway
* PostgreSQL
* React + Material UI

---

# Melhorias Futuras

* Autenticação JWT
* Cache Redis
* Mensageria com RabbitMQ
* Observabilidade (Prometheus/Grafana)
* Testes de Integração
* CI/CD com GitHub Actions

---

# Autor

Lucas Queiroz Oliveira

Projeto desenvolvido como desafio técnico para processo seletivo da **SRM Asset**.
