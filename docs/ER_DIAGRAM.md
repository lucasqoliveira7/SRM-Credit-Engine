\# Diagrama ER - SRM Credit Engine



Este documento apresenta a modelagem relacional utilizada pelo SRM Credit Engine.



\## Entidades principais



\- \*\*cedents\*\*: empresas cedentes que originam recebíveis.

\- \*\*receivables\*\*: recebíveis negociados, como duplicatas e cheques.

\- \*\*settlements\*\*: liquidações financeiras realizadas sobre recebíveis.

\- \*\*currency\_rates\*\*: taxas de câmbio cadastradas para operações multimoedas.



\## Diagrama ER



```mermaid

erDiagram

&#x20;   CEDENTS ||--o{ RECEIVABLES : originates

&#x20;   RECEIVABLES ||--o{ SETTLEMENTS : settled\_by



&#x20;   CEDENTS {

&#x20;       BIGINT id PK

&#x20;       VARCHAR name

&#x20;       VARCHAR document UK

&#x20;       TIMESTAMP created\_at

&#x20;   }



&#x20;   RECEIVABLES {

&#x20;       BIGINT id PK

&#x20;       BIGINT cedent\_id FK

&#x20;       VARCHAR type

&#x20;       NUMERIC face\_value

&#x20;       VARCHAR currency

&#x20;       DATE due\_date

&#x20;       VARCHAR status

&#x20;       TIMESTAMP created\_at

&#x20;   }



&#x20;   SETTLEMENTS {

&#x20;       BIGINT id PK

&#x20;       BIGINT receivable\_id FK

&#x20;       NUMERIC present\_value

&#x20;       VARCHAR payment\_currency

&#x20;       NUMERIC exchange\_rate

&#x20;       VARCHAR status

&#x20;       TIMESTAMP settled\_at

&#x20;   }



&#x20;   CURRENCY\_RATES {

&#x20;       BIGINT id PK

&#x20;       VARCHAR from\_currency

&#x20;       VARCHAR to\_currency

&#x20;       NUMERIC rate

&#x20;       DATE reference\_date

&#x20;       TIMESTAMP created\_at

&#x20;   }

