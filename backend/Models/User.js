import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: [String],
      default: null,
    },
    phone: {
      type: String,
      default: "+ 123 456 789",
    },
    address: {
      type: String,
      default: "address",
    },
    bio: {
      type: String,
      default: "bio",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
