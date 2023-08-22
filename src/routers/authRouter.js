import express from 'express'
import login from '../controllers/auth/login.js'
import logout from '../controllers/auth/logout.js'

const router = express.Router()

// router.get('/', getAuth

router.post('/login', login)
router.post('/logout', logout)

// router.put('/', updateProduct)

//router.delete('/', deleteProduct)

export default router