import express from "express";
import { multerUpload } from "../middlewares/multer.js";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  login,
  getActiveUser,
} from "../controllers/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
const userRouter = express.Router();

// userRouter.get("/test");
userRouter.get("/all", getUsers);
userRouter.get("/id/:id", getUser);
userRouter.get("/active", jwtAuth, getActiveUser);

userRouter.post("/new", multerUpload.single("avatar"), createUser);
userRouter.post("/update/", jwtAuth, updateUser);
userRouter.post("/login", login);

export default userRouter;
