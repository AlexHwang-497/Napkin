import mongoose  from "mongoose";

// *we are speciygin that each post from our schemas should have the following.....
const portfolioSchema = mongoose.Schema({
    userId: String,
    assets:[String],
    ownership:[Number],
    dateCreated:Date,
    portfolioName:String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    tags: [String],
    
})

// * this allows us to creat our model
let PostPortfolio = mongoose.model('PostPortfolio',portfolioSchema)

export default PostPortfolio