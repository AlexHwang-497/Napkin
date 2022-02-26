import mongoose from "mongoose";
import express from "express";
import PostMessage from "../models/postMessage.js";
import postPortfolio from "../models/postPortfolio.js";
import PostPortfolio from "../models/postPortfolio.js";

const router = express.Router();

export const getPortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostPortfolio.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPortfolios = async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }

  try {
    const LIMIT = 3;

    const total = await PostPortfolio.countDocuments({});

    const portfolios = await PostPortfolio.find()
      .sort({ _id: 0 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: portfolios,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPortfolioBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostPortfolio.find({
      $or: [
        { sector: { $regex: title } },
        { assets: { $in: tags.split(",").map((e) => new RegExp(e, "i")) } },
      ],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPortfolio = async (req, res) => {
  const post = req.body;

  const newPostMessage = new postPortfolio({
    ...post,
    userId: req.userId,
    dateCreated: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();
    return res.json(newPostMessage);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { assets, ownership, sector, image, description, portfolioName } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPortfolio = {
    assets,
    ownership,
    sector,
    image,
    description,
    portfolioName,
  };

  const portfolio = await PostPortfolio.findByIdAndUpdate(
    id,
    updatedPortfolio,
    { new: true }
  );

  res.json(portfolio);
};

export const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id`);

  await PostPortfolio.findByIdAndRemove(id);

  res.json({ message: "Portfolio has been successfully deleted." });
};

export const likePortfolio = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id`);
  const post = await PostPortfolio.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPortfolio = await PostPortfolio.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPortfolio);
};

export const commentPortfolio = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostPortfolio.findById(id);

  post.comments.push(value);

  const updatedPost = await PostPortfolio.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export default router;
