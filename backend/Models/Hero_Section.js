import mongoose from "mongoose";
const Hero_Section_Schema = new mongoose.Schema(
  {
    photo: {
      type: [String],
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    sub_headline: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("hero_section", Hero_Section_Schema);
