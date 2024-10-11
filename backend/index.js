import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import postRouter from "./routes/post.route.js";
import { app, server } from "./socket/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "Server is running",
    success: true,
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/post", postRouter);

server.listen(PORT, async () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
