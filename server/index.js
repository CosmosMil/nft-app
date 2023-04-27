import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5001;

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

// const helloFunction = (req, res) => {
//   res.send("Heya!");
// };

// app.post("/test", helloFunction );
