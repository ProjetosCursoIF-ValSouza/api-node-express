import express from 'express';
import simulacaoControllers from '../controllers/simulacaoControllers.js';

const router = express.Router();

router.use('/api', simulacaoControllers);

// Middleware de tratamento de erros
router.use((err, req, res, next) => {
  console.error(err.stack); // Registra o erro no console para fins de depuração

  // Verifique se a exceção possui uma mensagem personalizada
  if (err.message) {
    return res.status(500).json({ error: err.message });
  }

  // Caso contrário, trate como um erro interno genérico
  res.status(500).json({ error: 'Erro interno do servidor' });
});

export default router;
