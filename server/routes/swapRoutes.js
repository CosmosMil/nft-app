import express from "express";
import { createSwapRequest, getAllRequestsForUser, getAllRequestsFromUser } from "../controllers/swapController.js";
import { multerUpload } from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const SwapRouter = express.Router();

SwapRouter.post("/new", createSwapRequest)

SwapRouter.get("/requests", jwtAuth, getAllRequestsFromUser)
SwapRouter.get("/requests/:userB", getAllRequestsForUser)





export default SwapRouter;