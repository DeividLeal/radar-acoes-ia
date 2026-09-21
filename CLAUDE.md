# CLAUDE.md

Instruções para o Claude Code (e outros assistentes) trabalharem neste repositório.

## Sobre o projeto

Radar de Ações é uma ferramenta simples para investidores iniciantes acompanharem
os dividendos/proventos recebidos e compararem o retorno das suas ações ao longo
do tempo, sem precisar de planilhas complicadas.

## Stack

- Node.js (sem frameworks ou dependências externas de runtime).
- Testes com o test runner nativo do Node (`node:test` + `node:assert/strict`).

## Estrutura

- `src/` — lógica de domínio (cálculo de proventos, retorno de ações, etc.).
- `tests/` — testes automatizados, um arquivo `*.test.js` por módulo de `src/`.

## Comandos

- `npm test` — roda toda a suíte de testes (`node --test`, que detecta automaticamente
  os arquivos `*.test.js` dentro de `tests/`).

## Convenções

- Não adicionar dependências de runtime sem necessidade real; preferir a stdlib do Node.
- Nomes de funções e variáveis de domínio em português, para refletir a linguagem do produto.
- Toda nova lógica de cálculo em `src/` deve vir acompanhada de teste real em `tests/`
  (sem mocks de cálculo — o teste deve validar o valor numérico esperado).
- Validar entradas nas fronteiras do domínio (ex.: valores negativos de preço/quantidade
  devem lançar erro) em vez de assumir dados sempre válidos.
