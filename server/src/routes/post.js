import express from 'express'
import * as postController from '../controllers/post'
import verifyToken, { isAdmin } from '../middlewares/verifyToken'

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPostsLimit)
router.get('/new-post', postController.getNewPosts)

router.use(verifyToken)
router.post('/create-new', postController.createNewPost)
// R2
router.get('/limit-admin', postController.getPostsLimitAdmin)
router.put('/update', postController.updatePost)
router.delete('/delete', postController.deletePost)

router.put('/update-admin/:pid', isAdmin, postController.updatePostByAdmin)
router.delete('/delete-admin/:pid', isAdmin, postController.deletePostByAdmin)





export default router