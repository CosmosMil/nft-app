import express from "express";
import { createSwapRequest, getAllRequestsForUser, getAllRequestsFromUser, swapController } from "../controllers/swapController.js";
import { multerUpload } from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";


const SwapRouter = express.Router();

SwapRouter.post("/new", createSwapRequest)

SwapRouter.get("/requests", jwtAuth, getAllRequestsFromUser)
SwapRouter.get("/requests/:userB", getAllRequestsForUser)

SwapRouter.post("/swap", swapController)





export default SwapRouter;