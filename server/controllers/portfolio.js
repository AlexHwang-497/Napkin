// * we are creating all the handlers for our routes in this componet
import mongoose from 'mongoose'
import express from 'express'

import PostMessage from '../models/postMessage.js'
import postPortfolio from '../models/postPortfolio.js'
import PostPortfolio from '../models/postPortfolio.js'

const router = express.Router()

export const getPortfolio = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostPortfolio.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPortfolios = async(req, res) => {
    let { page } = req.query;
    if(!page){
        page =1
    }
    console.log('this is the req.query in getPortfolios',req.query)
    try{
        const LIMIT = 3;
        const startIndex = (Number(page) - 1) * LIMIT; //! get the starting index of every page
        
        // *we are counting up all thedocuents so we know how many posts we have
        const total = await PostPortfolio.countDocuments({});
        // console.log('this is total of getPortoflios in server/controllers/portoflio.js',total)
        // * we are retrieving all the messages in the database
        const portfolios = await PostPortfolio.find().sort({ _id: 0 }).limit(LIMIT).skip(startIndex);
// !! check out the posts here.  maybe this should be portfolio?
        res.json({ data: portfolios, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        
    } catch (error){
        res.status(404).json({ message: error.message });
        console.log('this is the error message from getPortfolios in server/controllers:',error.message)
    }
}
// *req.query; 
    //! Query-> /posts?page=1 -> page = 1
    //! PARARMS-> /posts/:123 -> id =123
    export const getPortfolioBySearch = async (req, res) => {
        const { searchQuery, tags } = req.query;
        console.log('this is the searchQuery in getPostsBySearch in server/controllers/portfolio.js',searchQuery)
        console.log('this is the tags in getPostsBySearch in server/controllers/portfolio.js',tags)
    
        try {
            const title = new RegExp(searchQuery, "i");
            console.log('this is the title in getPortfolioBySearch in controller/portfolio',title)
    
            const posts = await PostPortfolio.find({ $or: [ { 'sector':{$regex:title} }, { 'assets': { $in: tags.split(',').map(e=>new RegExp(e,'i')) } } ]});
            // const posts = await PostPortfolio.find({ $or: [ {'portfolioName':{$regex:title}} ]});
            
            // console.log('this is the posts in getPortfolioBySearch in controller/portfolio',posts)
    
            res.json({ data: posts });
        } catch (error) {    
            res.status(404).json({ message: error.message });
        }
    }


export const createPortfolio = async(req,res) => {
    const post = req.body

    const newPostMessage = new postPortfolio({ ...post, userId: req.userId, dateCreated: new Date().toISOString() })

    try{
        await newPostMessage.save();
        return res.json(newPostMessage)
    } catch(error){
        console.log('this is the error in createpost in the server/controllers/posts.js:',error)
        return res.status(409).json({message:error.message})

    }
}

export const updatePortfolio = async (req, res) => {

    const { id } = req.params;
    const { assets, ownership,sector,image } = req.body;
    console.log('this is everything req.body in updatePortfolio of server/controlelrs/posts', req.body)
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPortfolio = { assets, ownership,sector,image  };

    const portfolio = await PostPortfolio.findByIdAndUpdate(id, updatedPortfolio, { new: true });

    res.json(portfolio);
    
}


export const deletePortfolio = async (req, res) => {
    const { id } = req.params;
    console.log('this is what is given in deletePost in server/controllers/posts.js',req.params)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);

    await PostPortfolio.findByIdAndRemove(id);
    console.log('we have reacahed delete in deletePost')
    res.json({ message: "Portfolio has been successfully deleted." });



    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);


}

export const likePortfolio = async (req, res) => {
    const { id } = req.params;
    console.log('this is the req.params in like post of controllers/likePortfolio.js:', req.params)
    

    if (!req.userId) {return res.json({ message: "Unauthenticated" });}

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);
    const post = await PostPortfolio.findById(id);

    // * this helps us determine if the use has already liked the post;  it will see if the userID is already in the post.  
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
        //* we  are pushing the ID if it is not there orignially
        post.likes.push(req.userId);
      } else {
        //   *this is going to return us the array of all the likes besides the person's current likes
        post.likes = post.likes.filter((id) => id !== String(req.userId));
      }
    const updatedPortfolio = await PostPortfolio.findByIdAndUpdate(id, post, { new: true });
      
    res.json(updatedPortfolio);
}

// *export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value }); this is from the API/index.js
    // ! this is waht is poulating this post
export const commentPortfolio = async (req, res) => {
    console.log('[Server/portfolio.commentPost',req)
    const { id } = req.params;
    const { value } = req.body;
    // *we are getting the post from the database
    const post = await PostPortfolio.findById(id);
    // * we are then pushing/adding the comments
    post.comments.push(value);
    // *then we are updating the datbase with the new comment
    const updatedPost = await PostPortfolio.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router