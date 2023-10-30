import express from 'express';
import express from 'express';
import SimulacaoBeneficio from '../models/SimulacaoBeneficio.js';
const router = express.Router();
const simulacaoModel = new SimulacaoBeneficio();
const db = require('../config/database.config'); // Importe o arquivo de configuração do banco de dados

// Rota POST para processar os dados do formulário de simulação
router.post('/simule', async (req, res) => {
  try {
    // Extrair os dados do formulário
    const arrCampoAnoMes = req.body['campoAnoMes[]'];
    const arrCampoSalario = req.body['campoSalario[]'];
    const dataNascimento = req.body.dataNascimento;
    const genero = req.body.genero;

    // Calcular a idade da aposentadoria e mês/ano da aposentadoria
    const { periodoContribuicaoMinimo, idadeAposentadoria } = calcularRequisitosAposentadoria(genero);
    const { tempoContribuicaoMes, tempoContribuicaoPendente } = calcularTempoContribuicao(arrCampoAnoMes, periodoContribuicaoMinimo);

    // Inserir simulação no banco de dados
    const idSimulacao = await simulacaoModel.criar({
      genero,
      dataNascimento,
      idade: calcularIdade(dataNascimento),
      tempoContribuicaoMes,
      idadeAposentadoria,
      ...calcularDataAposentadoria(dataNascimento, idadeAposentadoria),
      tempoContribuicaoPendente,
    });

    // Calcular o valor do benefício
    const valorBeneficio = calcularValorBeneficio(arrCampoSalario);

    // Atualizar o valor do benefício no registro da simulação
    await simulacaoModel.atualizarValorBeneficio(idSimulacao, valorBeneficio);

    // Retornar os resultados em formato JSON
    const simulacaoData = {
      idSimulacao,
      genero,
      dataNascimento,
      tempoContribuicaoMes,
      idadeAposentadoria,
      ...calcularDataAposentadoria(dataNascimento, idadeAposentadoria),
      tempoContribuicaoPendente,
      valorBeneficio,
    };

    res.json({ success: true, data: simulacaoData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao processar a simulação.', error: error.message });
  }
});

// Função para calcular os requisitos de aposentadoria com base no gênero
function calcularRequisitosAposentadoria(genero) {
  if (genero === 'Masculino') {
    return { periodoContribuicaoMinimo: 240, idadeAposentadoria: 65 };
  } else if (genero === 'Feminino') {
    return { periodoContribuicaoMinimo: 180, idadeAposentadoria: 62 };
  }
  // Trate outros casos ou retorne requisitos padrão
  return { periodoContribuicaoMinimo: 0, idadeAposentadoria: 0 };
}

// Função para calcular o tempo de contribuição e pendente
function calcularTempoContribuicao(arrCampoAnoMes, periodoContribuicaoMinimo) {
  const tempoContribuicaoMes = arrCampoAnoMes.length;
  const tempoContribuicaoPendente = periodoContribuicaoMinimo - tempoContribuicaoMes;
  return { tempoContribuicaoMes, tempoContribuicaoPendente };
}

// Função para calcular a idade com base na data de nascimento
function calcularIdade(dataNascimento) {
  const anoNascimento = new Date(dataNascimento).getFullYear();
  return new Date().getFullYear() - anoNascimento;
}

// Função para calcular a data da aposentadoria
function calcularDataAposentadoria(dataNascimento, idadeAposentadoria) {
  const anoNascimento = new Date(dataNascimento).getFullYear();
  const mesNascimento = new Date(dataNascimento).getMonth() + 1;
  const anoAposentadoria = anoNascimento + idadeAposentadoria;
  const mesAposentadoria = (new Date(anoAposentadoria, mesNascimento - 1).getMonth() + 1).toString().padStart(2, '0');
  return { mesAposentadoria, anoAposentadoria };
}

// Função para calcular o valor do benefício
function calcularValorBeneficio(arrCampoSalario) {
  let valorBeneficio = 0;
  for (let i = 0; i < arrCampoSalario.length; i++) {
    const salario = parseFloat(arrCampoSalario[i].replace('.', '').replace('R$', '').replace(',', '.'));
    valorBeneficio += salario;
  }
  return (valorBeneficio / arrCampoSalario.length) * 0.60;
}

export default router;

const router = express.Router();
const simulacaoModel = new SimulacaoBeneficio();
const db = require('../config/database.config'); // Importe o arquivo de configuração do banco de dados

// Rota POST para processar os dados do formulário de simulação
router.post('/simule', async (req, res) => {
  try {
    // Extrair os dados do formulário
    const arrCampoAnoMes = req.body['campoAnoMes[]'];
    const arrCampoSalario = req.body['campoSalario[]'];
    const dataNascimento = req.body.dataNascimento;
    const genero = req.body.genero;

    // Calcular a idade da aposentadoria e mês/ano da aposentadoria
    const { periodoContribuicaoMinimo, idadeAposentadoria } = calcularRequisitosAposentadoria(genero);
    const { tempoContribuicaoMes, tempoContribuicaoPendente } = calcularTempoContribuicao(arrCampoAnoMes, periodoContribuicaoMinimo);

    // Inserir simulação no banco de dados
    const idSimulacao = await simulacaoModel.criar({
      genero,
      dataNascimento,
      idade: calcularIdade(dataNascimento),
      tempoContribuicaoMes,
      idadeAposentadoria,
      ...calcularDataAposentadoria(dataNascimento, idadeAposentadoria),
      tempoContribuicaoPendente,
    });

    // Calcular o valor do benefício
    const valorBeneficio = calcularValorBeneficio(arrCampoSalario);

    // Atualizar o valor do benefício no registro da simulação
    await simulacaoModel.atualizarValorBeneficio(idSimulacao, valorBeneficio);

    // Retornar os resultados em formato JSON
    const simulacaoData = {
      idSimulacao,
      genero,
      dataNascimento,
      tempoContribuicaoMes,
      idadeAposentadoria,
      ...calcularDataAposentadoria(dataNascimento, idadeAposentadoria),
      tempoContribuicaoPendente,
      valorBeneficio,
    };

    res.json({ success: true, data: simulacaoData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao processar a simulação.', error: error.message });
  }
});

// Função para calcular os requisitos de aposentadoria com base no gênero
function calcularRequisitosAposentadoria(genero) {
  if (genero === 'Masculino') {
    return { periodoContribuicaoMinimo: 240, idadeAposentadoria: 65 };
  } else if (genero === 'Feminino') {
    return { periodoContribuicaoMinimo: 180, idadeAposentadoria: 62 };
  }
  // Trate outros casos ou retorne requisitos padrão
  return { periodoContribuicaoMinimo: 0, idadeAposentadoria: 0 };
}

// Função para calcular o tempo de contribuição e pendente
function calcularTempoContribuicao(arrCampoAnoMes, periodoContribuicaoMinimo) {
  const tempoContribuicaoMes = arrCampoAnoMes.length;
  const tempoContribuicaoPendente = periodoContribuicaoMinimo - tempoContribuicaoMes;
  return { tempoContribuicaoMes, tempoContribuicaoPendente };
}

// Função para calcular a idade com base na data de nascimento
function calcularIdade(dataNascimento) {
  const anoNascimento = new Date(dataNascimento).getFullYear();
  return new Date().getFullYear() - anoNascimento;
}

// Função para calcular a data da aposentadoria
function calcularDataAposentadoria(dataNascimento, idadeAposentadoria) {
  const anoNascimento = new Date(dataNascimento).getFullYear();
  const mesNascimento = new Date(dataNascimento).getMonth() + 1;
  const anoAposentadoria = anoNascimento + idadeAposentadoria;
  const mesAposentadoria = (new Date(anoAposentadoria, mesNascimento - 1).getMonth() + 1).toString().padStart(2, '0');
  return { mesAposentadoria, anoAposentadoria };
}

// Função para calcular o valor do benefício
function calcularValorBeneficio(arrCampoSalario) {
  let valorBeneficio = 0;
  for (let i = 0; i < arrCampoSalario.length; i++) {
    const salario = parseFloat(arrCampoSalario[i].replace('.', '').replace('R$', '').replace(',', '.'));
    valorBeneficio += salario;
  }
  return (valorBeneficio / arrCampoSalario.length) * 0.60;
}

export default router;
