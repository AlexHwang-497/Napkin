import express from "express";
const router = express.Router();

import { signin, signup, guestSignIn } from "../controllers/user.js";

// *we are utilizing post routes because we are sending data to the backend
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/guest", guestSignIn);

export default router;