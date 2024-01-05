import Banner from "../Models/Banner.js";

export const createBanner = async (req, res, next) => {
  try {
    const newBanner = new Banner(req.body);
    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    next(error);
  }
};

export const getBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    res.status(200).json(banner);
  } catch (err) {
    next(err);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const update_banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(update_banner);
  } catch (err) {
    next(err);
  }
};
