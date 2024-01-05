import Subscriber from "../Models/Subscriber.js";

export const createSubscriber = async (req, res, next) => {
  try {
    const newSubscriber = new Subscriber(req.body);
    const savedSubscriber = await newSubscriber.save();
    res.status(201).json(savedSubscriber);
  } catch (error) {
    next(error);
  }
};
export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (err) {
    next(err);
  }
};

export const recentSubscribers = async (req, res, next) => {
  const { limit, ...others } = req.query;
  try {
    const subscribers = await Subscriber.find().limit(parseInt(limit));
    res.status(200).json(subscribers);
  } catch (err) {
    next(err);
  }
};

export const countSubscribers = async (req, res, next) => {
  try {
    const users = await Subscriber.countDocuments({});
    res.status(200).json(users);
  } catch (err) {
    console.error("Error in getUsersCount:", err);
    next(err);
  }
};
