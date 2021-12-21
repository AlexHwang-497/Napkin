// * we are creating all the handlers for our routes in this componet
import mongoose from 'mongoose'
import express from 'express'

import PostMessage from '../models/postMessage.js'

const router = express.Router()

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosts = async(req, res) => {
    let { page } = req.query;
    if(!page){
        page=1
    }
    try{
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; //! get the starting index of every page
        
        // *we are counting up all thedocuents so we know how many posts we have
        const total = await PostMessage.countDocuments({});
        console.log('[server/controllers.getPosts.startIndex',startIndex)
        // * we are retrieving all the messages in the database
        const posts = await PostMessage.find().sort({ _id: 0 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error){
        res.status(404).json({ message: error.message });
        console.log('this is the error message from getPosts in server/controllers:',error.message)
    }
}
// *req.query; 
    //! Query-> /posts?page=1 -> page = 1
    //! PARARMS-> /posts/:123 -> id =123
    export const getPostsBySearch = async (req, res) => {
        const { searchQuery, tags } = req.query;
        console.log('this is the searchQuery in getPostsBySearch in server/controllers/posts.js',searchQuery)
        console.log('this is the tags in getPostsBySearch in server/controllers/posts.js',tags)
    
        try {
            const title = new RegExp(searchQuery, "i");
    
            const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
            
    
            res.json({ data: posts });
        } catch (error) {    
            res.status(404).json({ message: error.message });
        }
    }
//     export const getPostsBySearch = async (req, res) => {
//     const { searchQuery, tags } = req.query;
//     console.log('this is the req/query from getPostsBySearch in server/controllers/posts.js:',req.query)

//     try {
//         // *i; it stands for ignore case
//         const title = new RegExp(searchQuery, "i");
//         // *$or; stand for either find me the title "or" the tagrs
//         // *$in; this is asking for if there are these tags "in" our query
//         const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

//         res.json({ data: posts });
//     } catch (error) {    
//         res.status(404).json({ message: error.message });
//     }
// }

export const createPost = async(req,res) => {
    const post = req.body

    // console.log('this is the req.body in createPost of server/controllers/posts.js',post)

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try{
        await newPostMessage.save();
        return res.json(newPostMessage)
    } catch(error){
        console.log('this is the error in createpost in the server/controllers/posts.js:',error)
        return res.status(409).json({message:error.message})

    }
}

export const updatePost = async (req, res) => {

    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    console.log('this is everything req.body in updatepost of server/controlelrs/posts', req.body)
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
    // // * this is coming from  post/123 for example
    // console.log('this is the request from update post in server/controllers/posts.js:',req)
    // // const { id: _id } = req.params;
    // const post = req.body

    // // * this is going to check if our _id is real or not
    // if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id`);

    // // *if the id is valid then we do the following

    // const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
    // console.log('this is what is given in updatedPost in server/controllers/posts.js',updatedPost)
    // res.json(updatedPost);
    
    // const { title, message, creator, selectedFile, tags } = req.body;

    // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
}


export const deletePost = async (req, res) => {
    const { id } = req.params;
    console.log('this is what is given in deletePost in server/controllers/posts.js',req.params)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);

    await PostMessage.findByIdAndRemove(id);
    console.log('we have reacahed delete in deletePost')
    res.json({ message: "Post deleted successfully." });



    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);


}

export const likePost = async (req, res) => {
    const { id } = req.params;
    console.log('this is the req.params in like post of controllers/posts.js:', req.params)
    

    if (!req.userId) {return res.json({ message: "Unauthenticated" });}

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);
    const post = await PostMessage.findById(id);

    // * this helps us determine if the use has already liked the post;  it will see if the userID is already in the post.  
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
        //* we  are pushing the ID if it is not there orignially
        post.likes.push(req.userId);
      } else {
        //   *this is going to return us the array of all the likes besides the person's current likes
        post.likes = post.likes.filter((id) => id !== String(req.userId));
      }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
      
    res.json(updatedPost);
}

// *export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value }); this is from the API/index.js
    // ! this is waht is poulating this post
export const commentPost = async (req, res) => {
    console.log('[Server/posts.commentPost',req)
    const { id } = req.params;
    const { value } = req.body;
    // *we are getting the post from the database
    const post = await PostMessage.findById(id);
    // * we are then pushing/adding the comments
    post.comments.push(value);
    // *then we are updating the datbase with the new comment
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router