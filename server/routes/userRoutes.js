import express from "express";
import {multerUpload} from "../middlewares/multer.js"
import { testingRoute, getUsers, getUser, createUser, updateUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/test",);
userRouter.get("/all", getUsers);
userRouter.get("/id/:id", getUser);

userRouter.post("/new", multerUpload.single("avatar"), createUser);
userRouter.post("/update/:id", updateUser);

export default userRouter;
