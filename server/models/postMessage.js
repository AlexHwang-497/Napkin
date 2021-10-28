import mongoose  from "mongoose";

// *we are speciygin that each post from our schemas should have the following.....
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    // *we are converting an image into a string using the base 64
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

// * this allows us to creat our model
let PostMessage = mongoose.model('PostMesage',postSchema)

export default PostMessage