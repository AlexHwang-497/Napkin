import express from 'express'
import { getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
// ? we include the middleware on specific actions aka in this case we want to give them one like per a post
import auth from "../middleware/auth.js";


const router = express.Router()

router.get('/', getPosts);
router.post('/',auth,  createPost);
// *managed on the frontend
router.patch('/:id', auth, updatePost);
// *managed on the frontend
router.delete('/:id', auth, deletePost);
// *this is a patch request because it involves us increasing the number of likes
    // *this will be managed on the backend
router.patch('/:id/likePost', auth, likePost);



export default router




// router.get('/', (req,res) => {
//      res.send('this works!!!')
//  })