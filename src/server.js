import express from 'express'   // Importa o framework Express usando ES6 Modules.
import bodyParser from 'body-parser'  // Importa o middleware 'body-parser' para lidar com requisições JSON.
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routers/userRouter.js'      // Importa o router (roteador) para as rotas relacionadas a usuários.
import productRouter from './routers/productRouter.js' // Importa o router (roteador) para as rotas relacionadas a produtos.
import authRouter from './routers/authRouter.js' // Importa o router (roteador) para as rotas relacionadas à autenticação.
import {PORT} from './config.js'  // Importa a constante PORT do arquivo de configuração.

const api = express()  // Cria uma instância do Express e a atribui à variável 'api'.

//converte toda requisição com body json para objeto no req.body
api.use(cors())

// Converte toda a requisição com corpo JSON para objeto no req.body (middleware):
api.use(bodyParser.json())
api.use(morgan('combined'))

// Define uma rota de raiz ('/') que responde com uma mensagem de boas-vindas em JSON.
api.get('/', (req, res) => {
    res.json({message: "Bem-vindo a nossa API"})
})

// Usa os routers importados para gerenciar as rotas relacionadas a usuários, produtos e autenticação.
api.use('/user', userRouter)
api.use('/product', productRouter)
api.use('/auth', authRouter)

// Inicializa o servidor (faz o servidor rodar) na porta especificada na constante PORT.
api.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}! http://localhost:${PORT}`)
})


// Esse arquivo é responsável por configurar o servidor da API e direcionar as solicitações
// para os routers apropriados, que cuidarão do processamento das rotas específicas. 


//....................................................................................................

