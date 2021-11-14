import express from 'express'
// import { getPosts, getPostsBySearch, createPost, updatePost, likePost, deletePost,getPost,commentPost } from '../controllers/posts.js';
import { createPortfolio,getPortfolios,getPortfolioBySearch, deletePortfolio,updatePortfolio,getPortfolio,likePortfolio} from '../controllers/portfolio.js';

const router = express.Router()

// ? we include the middleware on specific actions aka in this case we want to give them one like per a post
import auth from "../middleware/auth.js";



router.get('/search', getPortfolioBySearch);
router.get('/', getPortfolios);
router.get('/:id', getPortfolio);
router.post('/',auth,  createPortfolio);
// *managed on the frontend
router.patch('/:id', auth, updatePortfolio);
// *managed on the frontend
router.delete('/:id', auth, deletePortfolio);
// *this is a patch request because it involves us increasing the number of likes
    // *this will be managed on the backend
router.patch('/:id/likePortfolio', auth, likePortfolio);

// router.post('/:id/commentPost', auth, commentPost);

export default router




// router.get('/', (req,res) => {
//      res.send('this works!!!')
//  })