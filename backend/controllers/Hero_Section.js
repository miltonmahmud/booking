import Hero_Section from "../models/Hero_Section.js";

export const HeroSection = async (req, res, next) => {
  try {
    const HeroSection = await Hero_Section.findById(req.params.id);
    res.status(200).json(HeroSection);
  } catch (err) {
    next(err);
  }
};

export const createHeroSection = async (req, res, next) => {
  const newHero_Section = new Hero_Section(req.body);

  try {
    const savedHero_Section = await newHero_Section.save();
    res.status(200).json(savedHero_Section);
  } catch (err) {
    next(err);
  }
};
export const updateHeroSection = async (req, res, next) => {
  try {
    const updatedHero_Section = await Hero_Section.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHero_Section);
  } catch (err) {
    next(err);
  }
};
