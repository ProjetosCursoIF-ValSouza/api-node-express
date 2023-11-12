import express from 'express';
<<<<<<< HEAD
// import simulacaoRegras from './controllers/simule/simulacaoRegras.js';

const router = express.Router();

// Rota de simulação com simulacaoRegras
// router.use('/simule', simulacaoRegras);

// Middleware de tratamento de erros
router.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message) {
    return res.status(500).json({ error: err.message });
  }
=======
<<<<<<<< HEAD:src/routers/simulacaoRoutes.js
import simulacaoRegras from '../controllers/simule/simulacaoRegras';
========
import './simulacaoRouter.js'
>>>>>>>> 1f785ac9630fffba2ebe73bb2d23da8efee7757d:src/routers/simuleRouter.js

const router = express.Router();

router.use('/api', simulacaoregras);

// Middleware de tratamento de erros
router.use((err, req, res, next) => {
  console.error(err.stack); // Registra o erro no console para fins de depuração

  // Verifique se a exceção possui uma mensagem personalizada
  if (err.message) {
    return res.status(500).json({ error: err.message });
  }

  // Caso contrário, trate como um erro interno genérico
>>>>>>> 1f785ac9630fffba2ebe73bb2d23da8efee7757d
  res.status(500).json({ error: 'Erro interno do servidor' });
});

export default router;
