import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cloudinaryConfig from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import NFTRouter from "./routes/nftRoutes.js";
import passportConfig from "./config/passport.js";
import SwapRouter from "./routes/swapRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

  const allowedOrigins = [
    "http://localhost:3000",
    "https://swap-nfts.vercel.app",
  ];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  app.use(cors(corsOptions));

const setMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  cloudinaryConfig();
  passportConfig();
};

const connectMongoose = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connection to MongoDB established");
    })
    .catch((err) => console.log(err));
};

const connectRoutes = () => {
  app.use("/api/user", userRouter);
  app.use("/api/nfts", NFTRouter);
  app.use("/api/swaps", SwapRouter);
  app.use("*", (req, res) => {
    res.status(500).json({ error: "Endpoint not found" });
  });
};

const connectServer = () => {
app.listen(port, () => {
console.log("Server is running on port ", port);
  });
} 

async function controller() {
setMiddlewares();
await connectMongoose();
  connectRoutes();
  connectServer();  
}

controller()
