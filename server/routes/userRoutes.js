import express from "express";
import { testingRoute, getUsers, getUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/test",);
userRouter.get("/all", getUsers);
userRouter.get("/id/:id", getUser);

export default userRouter;
