import mongoose  from "mongoose";

// *we are speciygin that each post from our schemas should have the following.....
const portfolioSchema = mongoose.Schema({
    userId: String,
    Assets:[String],
    Ownership:[Number],
    DateCreated:Date
})

// * this allows us to creat our model
let Portfolio = mongoose.model('portfolio',portfolioSchema)

export default Portfolio