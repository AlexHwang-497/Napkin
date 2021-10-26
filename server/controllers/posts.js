// * we are creating all the handlers for our routes in this componet
import mongoose from 'mongoose'
import express from 'express'

import PostMessage from '../models/postMessage.js'

const router = express.Router()

export const getPosts = async(req, res) => {
    try{
        // * we are retrieving all the messages in the database
        const postMessages = await PostMessage.find();
        // console.log('this is the postMessages from controllers->post.js',postMessages)
        // console.log(postMessages)
        res.status(200).json(postMessages);
    } catch (error){
        res.status(404).json({ message: error.message });
        console.log('this is the error message from getPosts in server/controllers:',error.message)
    }
}

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


export default router