// ! this is where we put the logic for our user to sign in and out
// *this is used to hash out passwords
import bcrypt from "bcryptjs";
// *this allows us to store the user for some amt of time from hours, days, to weeks for ex.
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import UserModal from "../models/user.js";

const secret = "test";

export const guestSignIn = async (req, res) => {
  const email = process.env.GUEST_USER;
  const password = process.env.GUEST_PW;
  req.body = { email, password };
  return signin(req, res);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModal.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { id, email, password, confirmPassword, firstName, lastName } =
    req.body;

  try {
    const existingUser = await UserModal.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
