# Report de IA

## Objetivo

Durante o desenvolvimento do **SRM Credit Engine**, ferramentas de Inteligência Artificial foram utilizadas como apoio para acelerar tarefas repetitivas, sugerir implementações e revisar código, mantendo sempre a responsabilidade do desenvolvedor pela validação e correção das soluções geradas.

---

# Ferramentas Utilizadas

* ChatGPT (OpenAI)
* Claude (Anthropic)
* Claude Code (Anthropic)

---

# Principais Utilizações

## Estrutura inicial do projeto

A IA foi utilizada para auxiliar na definição da estrutura do projeto, organização de pacotes e separação entre backend e frontend.

Exemplos:

* Organização em camadas (Controller, Service e Repository)
* Estrutura do projeto React
* Organização dos DTOs
* Definição inicial das entidades

---

## Backend

A IA auxiliou na implementação de:

* Endpoints REST
* DTOs
* Mappers
* Repositories
* Configuração do Flyway
* Configuração do PostgreSQL
* Swagger/OpenAPI
* Tratamento global de exceções

Toda implementação foi revisada manualmente antes da integração ao projeto.

---

## Frontend

A IA foi utilizada para acelerar o desenvolvimento da interface:

* Componentes React
* Integração com Axios
* Paginação
* Filtros
* Layout utilizando Material UI
* Ajustes visuais e design dos cards de resultado

O **Claude Code** foi utilizado especificamente para:

* Implementação e iteração dos filtros do extrato de liquidações
* Correções de validação e exibição de erros no frontend
* Ajustes de layout e padronização visual entre páginas
* Revisão e auditoria geral do projeto
* Correção de bugs pontuais identificados durante os testes

---

## Banco de Dados

Auxiliou na geração de:

* Scripts DDL
* Índices
* Relacionamentos
* Constraints
* Diagrama ER

---

# Problemas Encontrados

Durante o desenvolvimento algumas sugestões da IA precisaram ser corrigidas manualmente.

Exemplos:

* Uso de `JOIN FETCH` em consultas paginadas do Spring Data JPA, o que ocasionava erro de paginação.
* Ajustes na serialização de respostas da API.
* Correções na integração entre frontend e backend para paginação.
* Adequação da formatação de datas e valores monetários.
* Correções na configuração de CORS e comunicação entre React e Spring Boot.

---

# Benefícios Obtidos

O uso da IA proporcionou:

* Maior produtividade.
* Redução do tempo de desenvolvimento.
* Apoio na geração de código repetitivo.
* Sugestões de boas práticas.
* Apoio na documentação técnica.

---

# Responsabilidade Técnica

Todo o código gerado foi analisado, ajustado e validado manualmente antes da utilização.

As decisões arquiteturais, regras de negócio, integrações e validações permaneceram sob responsabilidade do desenvolvedor.

---

# Considerações Finais

A Inteligência Artificial foi utilizada como ferramenta de apoio ao desenvolvimento, não substituindo o conhecimento técnico necessário para compreender, revisar e evoluir a solução implementada.
