# 🚀 SRM Credit Engine

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)
![Maven](https://img.shields.io/badge/Maven-3.9-red)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Sobre

O **SRM Credit Engine** é uma plataforma para simulação de precificação e liquidação de recebíveis multimoedas.

O projeto foi desenvolvido como solução para o desafio técnico da **SRM Asset**, utilizando arquitetura em camadas, Spring Boot, PostgreSQL, Flyway e Docker.

---

## Arquitetura

```
React (Frontend)
        │
        ▼
Spring Boot REST API
        │
        ▼
Business Rules
(Strategy Pattern)
        │
        ▼
Spring Data JPA
        │
        ▼
PostgreSQL
```

---

## Tecnologias

- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- Flyway
- Docker
- Maven
- Swagger / OpenAPI
- JUnit 5

---

## Estrutura

```
backend
├── controller
├── dto
├── entity
├── repository
├── service
│     └── pricing
│           └── strategy
├── mapper
├── exception
└── config
```

---

## Funcionalidades

### Precificação

- Simulação do valor presente
- Strategy Pattern
- Regras por tipo de recebível

### Liquidação

- Registro de liquidação
- Conversão de moeda
- Persistência em banco

---

## Banco de Dados

Tabelas criadas automaticamente pelo Flyway:

- cedents
- receivables
- settlements
- currency_rates

---

## Como executar

### Docker

```bash
docker compose up -d
```

### Backend

```bash
cd backend

./mvnw spring-boot:run
```

---

## Swagger

```
http://localhost:8080/swagger-ui/index.html
```

---

## Testes

```bash
./mvnw test
```

---

## Endpoints

### Simulação

```
POST /api/pricing/simulate
```

### Liquidação

```
POST /api/liquidations
```

---

## Próximas melhorias

- Frontend React
- Dashboard
- Autenticação JWT
- Logs
- Testes de integração
- CI/CD
- Deploy

---

## Autor

Lucas Queiroz Oliveira

Desenvolvido como desafio técnico para a SRM Asset.