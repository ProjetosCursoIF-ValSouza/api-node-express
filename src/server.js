import express from 'express'; // Importa o framework Express usando ES6 Modules.
import bodyParser from 'body-parser'; // Importa o middleware 'body-parser' para lidar com requisições JSON.
import cors from 'cors';
import morgan from 'morgan';
import simulacaoRegras from './controllers/simule/simulacaoRegras.js';
// import simulacaoRouter from './routers/simulacaoRouter.js'
import userRouter from './routers/userRouter.js'; // Importa o router (roteador) para as rotas relacionadas a usuários.
import productRouter from './routers/productRouter.js'; // Importa o router (roteador) para as rotas relacionadas a produtos.
import authRouter from './routers/authRouter.js'; // Importa o router (roteador) para as rotas relacionadas à autenticação.

const api = express(); // Cria uma instância do Express e a atribui à variável 'api'.

// Converte toda a requisição com corpo JSON para objeto no req.body (middleware):
api.use(bodyParser.json());
api.use(morgan('combined'));

// Adiciona o middleware CORS para permitir solicitações de qualquer origem.
api.use(cors());

// Define uma rota de raiz ('/') que responde com uma mensagem de boas-vindas em JSON.
api.get('/', (req, res) => {
  res.json({ message: "Bem-vindo a nossa API" });
});

// Usa os routers importados para gerenciar as rotas relacionadas a usuários, produtos e autenticação.
api.use('/user', userRouter);
api.use('/product', productRouter);
api.use('/auth', authRouter);
<<<<<<< HEAD
// api.use('/simulacao', simulacaoRouter);
api.use('/simule', simulacaoRegras);

// Esse arquivo é responsável por configurar o servidor da API e direcionar as solicitações
// para os routers apropriados, que cuidarão do processamento das rotas específicas.
