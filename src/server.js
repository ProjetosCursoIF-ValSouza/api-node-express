// const express = require('express')
import express from 'express'
import bodyParser from 'body-parser'

import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import authRouter from './routers/authRouter.js'
import {PORT} from './config.js'


const api = express()

//converte toda a requisição com body json para objeto no req.body (midware):
api.use(bodyParser.json())

api.get('/', (req, res) => {
    res.json({message: "Bem-vindo a nossa API"})
})

api.use('/user', userRouter)
api.use('/product', productRouter)
api.use('/auth', authRouter)


//inicializa o servidor (faz o servidor rodar)
api.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}! http://localhost:${PORT}`)
})
