import express from 'express'
import getProduct from '../controllers/product/getProduct.js'
import insertProduct from '../controllers/product/insertProduct.js'
import updateProduct from '../controllers/product/updateProduct.js'
import deleteProduct from '../controllers/product/deleteProduct.js'

const router = express.Router()

// router.get('/', getAuth

router.post('/', insertOuth)

// router.put('/', updateProduct)

//router.delete('/', deleteProduct)

export default router