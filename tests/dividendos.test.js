'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calcularTotalProventos, calcularRetornoTotal } = require('../src/dividendos');

test('calcularTotalProventos soma dividendos de múltiplos pagamentos', () => {
  const pagamentos = [
    { quantidadeAcoes: 100, valorPorAcao: 0.5 },
    { quantidadeAcoes: 100, valorPorAcao: 0.3 },
  ];

  assert.equal(calcularTotalProventos(pagamentos), 80);
});

test('calcularTotalProventos aplica retenção de imposto (JCP)', () => {
  const pagamentos = [
    { quantidadeAcoes: 200, valorPorAcao: 1, aliquotaImposto: 0.15 },
  ];

  assert.equal(calcularTotalProventos(pagamentos), 170);
});

test('calcularTotalProventos retorna 0 para lista vazia', () => {
  assert.equal(calcularTotalProventos([]), 0);
});

test('calcularTotalProventos rejeita valores negativos', () => {
  assert.throws(
    () => calcularTotalProventos([{ quantidadeAcoes: -1, valorPorAcao: 1 }]),
    RangeError
  );
});

test('calcularRetornoTotal soma valorização e proventos', () => {
  const resultado = calcularRetornoTotal({
    precoCompra: 10,
    precoAtual: 12,
    quantidade: 100,
    totalProventos: 50,
  });

  assert.equal(resultado.valorInvestido, 1000);
  assert.equal(resultado.valorAtual, 1200);
  assert.equal(resultado.retornoAbsoluto, 250);
  assert.equal(resultado.retornoPercentual, 25);
});

test('calcularRetornoTotal rejeita quantidade ou preço de compra inválidos', () => {
  assert.throws(
    () =>
      calcularRetornoTotal({
        precoCompra: 0,
        precoAtual: 10,
        quantidade: 100,
        totalProventos: 0,
      }),
    RangeError
  );
});
