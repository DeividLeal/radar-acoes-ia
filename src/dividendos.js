'use strict';

/**
 * Soma o total de proventos (dividendos/JCP) recebidos a partir de uma lista
 * de pagamentos, aplicando a retenção de imposto quando informada (ex.: 0.15 para JCP).
 * @param {Array<{quantidadeAcoes: number, valorPorAcao: number, aliquotaImposto?: number}>} pagamentos
 * @returns {number} total líquido recebido
 */
function calcularTotalProventos(pagamentos) {
  if (!Array.isArray(pagamentos)) {
    throw new TypeError('pagamentos deve ser um array');
  }

  return pagamentos.reduce((total, pagamento) => {
    const { quantidadeAcoes, valorPorAcao, aliquotaImposto = 0 } = pagamento;

    if (quantidadeAcoes < 0 || valorPorAcao < 0) {
      throw new RangeError('quantidadeAcoes e valorPorAcao devem ser não negativos');
    }

    const bruto = quantidadeAcoes * valorPorAcao;
    const liquido = bruto * (1 - aliquotaImposto);
    return total + liquido;
  }, 0);
}

/**
 * Calcula o retorno total de uma posição em ações, somando a valorização do
 * preço com os proventos recebidos no período.
 * @param {{precoCompra: number, precoAtual: number, quantidade: number, totalProventos: number}} posicao
 * @returns {{valorInvestido: number, valorAtual: number, retornoAbsoluto: number, retornoPercentual: number}}
 */
function calcularRetornoTotal({ precoCompra, precoAtual, quantidade, totalProventos }) {
  if (precoCompra <= 0 || quantidade <= 0) {
    throw new RangeError('precoCompra e quantidade devem ser maiores que zero');
  }

  const valorInvestido = precoCompra * quantidade;
  const valorAtual = precoAtual * quantidade;
  const retornoAbsoluto = valorAtual - valorInvestido + totalProventos;
  const retornoPercentual = (retornoAbsoluto / valorInvestido) * 100;

  return { valorInvestido, valorAtual, retornoAbsoluto, retornoPercentual };
}

module.exports = { calcularTotalProventos, calcularRetornoTotal };
