import httpErrors from "http-errors";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser:", error);
    next(httpErrors(500, "Failed to update user"));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted." });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    next(httpErrors(500, "Failed to delete user"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(httpErrors(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUser:", error);
    next(httpErrors(500, "Failed to retrieve user"));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers:", error);
    next(httpErrors(500, "Failed to retrieve users"));
  }
};

export const getUsersCount = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments({ isAdmin: false });
    res.status(200).json(usersCount);
  } catch (error) {
    console.error("Error in getUsersCount:", error);
    next(httpErrors(500, "Failed to retrieve users count"));
  }
};
