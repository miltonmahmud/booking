import Message from "../Models/Message.js";

export const createMessage = async (req, res, next) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const Messages = await Message.find();
    res.status(200).json(Messages);
  } catch (err) {
    next(err);
  }
};

export const countMessages = async (req, res, next) => {
  try {
    const users = await Message.countDocuments({});
    res.status(200).json(users);
  } catch (err) {
    console.error("Error in getUsersCount:", err);
    next(err);
  }
};
