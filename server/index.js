import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import NFTRouter from "./routes/nftRoutes.js";

const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// app.listen(port, () => {
//   console.log("Server is running on port" + port);
// });

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

app.use("/api/user", userRouter);
app.use("/api/NFTs", NFTRouter)
// const helloFunction = (req, res) => {
//   res.send("Heya!");
// };

// app.post("/test", helloFunction );
