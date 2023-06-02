import express from 'express'
import verifyToken, { isAdmin } from '../middlewares/verifyToken'
import * as userController from '../controllers/user'

const router = express.Router()

router.use(verifyToken)
router.get('/get-current', userController.getCurrent)
router.put('/', userController.updateUser)
router.get('/', userController.getUsers)
router.get('/roles', isAdmin, userController.getRoles)
router.put('/update-admin/:uid', isAdmin, userController.updateUserByAdmin)
router.delete('/delete-admin/:uid', isAdmin, userController.deleteUserByAdmin)


export default router