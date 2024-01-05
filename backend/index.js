import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import Hero_Section from "./routes/Hero_Section.js";
import contactRoute from "./routes/contact.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import subscriberRoute from "./routes/Subscriber.js";
import messageRoute from "./routes/Message.js";
import bannerRoute from "./routes/Banner.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/Hero_Section", Hero_Section);
app.use("/api/contact", contactRoute);
app.use("/api/subscriber", subscriberRoute);
app.use("/api/message", messageRoute);
app.use("/api/banner", bannerRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
`A`;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connect();
  console.log(`Connected to the backend. Listening on port ${PORT}`);
});
