import express from 'express';
import SimulacaoBeneficio from '../models/SimulacaoBeneficio.js';
const router = express.Router();
const simulacaoModel = new SimulacaoBeneficio();

// Rota para criar uma nova simulação
router.post('/simulacoes', async (req, res) => {
  try {
    const simulacao = req.body; // Certifique-se de que o corpo da solicitação contém os dados da simulação
    const result = await simulacaoModel.criar(simulacao);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao criar a simulação.', error: error.message });
  }
});

// Rota para obter todas as simulações
router.get('/simulacoes', async (req, res) => {
  try {
    const result = await simulacaoModel.listarTodos();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao listar as simulações.', error: error.message });
  }
});

// Rota para obter uma simulação pelo ID
router.get('/simulacoes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await simulacaoModel.consultarPorId(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter a simulação.', error: error.message });
  }
});

// Rota para excluir uma simulação pelo ID
router.delete('/simulacoes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await simulacaoModel.deletar(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao excluir a simulação.', error: error.message });
  }
});

export default router;
