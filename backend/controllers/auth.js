import httpErrors from "http-errors";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(httpErrors(500, "Please provide all fields"));
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return next(httpErrors(500, "User already exists"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ message: "User has been created." });
  } catch (error) {
    console.error("Error in register:", error);
    next(httpErrors(500, "Failed to register user"));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(httpErrors(500, "Please provide all fields"));
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(httpErrors(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(httpErrors(400, "Wrong password or username"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    const { password: userPassword, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    console.error("Error in login:", error);
    next(httpErrors(500, "Failed to log in"));
  }
};
