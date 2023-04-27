import express from "express";
const app = express();
const port = process.env.PORT || 5001;
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port" + port);
});

app.use("/api/user", userRouter);

// const helloFunction = (req, res) => {
//   res.send("Heya!");
// };

// app.post("/test", helloFunction );
