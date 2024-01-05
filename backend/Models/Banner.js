import mongoose from "mongoose";
const Banner_Schema = new mongoose.Schema(
  {
    photo: {
      type: [String],
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("banner", Banner_Schema);
