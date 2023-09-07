import express from 'express';
import getProduct from '../controllers/product/getProduct.js';
import insertProduct from '../controllers/product/insertProduct.js';
import updateProduct from '../controllers/product/updateProduct.js';
import deleteProduct from '../controllers/product/deleteProduct.js';

const router = express.Router();

// Rota para buscar uma lista de produtos ou um produto específico
router.get('/product', getProduct);

// Rota para criar um novo produto
router.post('/product', insertProduct);

// Rota para atualizar um produto existente
router.put('/product/:id', updateProduct);

// Rota para excluir um produto existente
router.delete('/product/:id', deleteProduct);

export default router;
