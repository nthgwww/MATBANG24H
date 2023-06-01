import express from 'express'
import * as authController from '../controllers/auth'


const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.put('/forgotpassword', authController.forgotpassword)
router.put('/resetpassword', authController.resetPassword)


export default router