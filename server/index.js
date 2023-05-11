import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import cloudinaryConfig from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import NFTRouter from "./routes/nftRoutes.js";
import passportConfig from "./config/passport.js";

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
  passportConfig();
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
  app.use("/api/nfts", NFTRouter);
  app.use("*", (req, res) => { res.status(500).json({ error: "Endpoint not found" }) });
};

setMiddlewares();
connectMongoose();
connectRoutes();

