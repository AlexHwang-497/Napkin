import mongoose from "mongoose";


const portfolioSchema = mongoose.Schema({
  userId: String,
  assets: [String],
  ownership: [Number],
  dateCreated: Date,
  portfolioName: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  tags: [String],
  sector: [String],
  image: [String],
  description: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});


let PostPortfolio = mongoose.model("PostPortfolio", portfolioSchema);

export default PostPortfolio;
