import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import cloudinaryConfig from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import NFTRouter from "./routes/nftRoutes.js";

const app = express();
const port = process.env.PORT || 5001;

const setMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
};


const connectMongoose = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(port, () => {
        console.log(
          "Connection to MongoDB established, and server is running on port " +
            port
        );
      });
    })
    .catch((err) => console.log(err));
};

const connectRoutes = () => {
  app.use("/api/user", userRouter);
  app.use("/api/NFTs", NFTRouter);
};

setMiddlewares();
connectMongoose();
connectRoutes();

