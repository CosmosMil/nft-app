import express from "express";
import { createSwapRequest, deleteRequest, getAllRequestsForUser, getAllRequestsFromUser, swapController } from "../controllers/swapController.js";
import { multerUpload } from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";


const SwapRouter = express.Router();

SwapRouter.post("/new", createSwapRequest)

SwapRouter.get("/requests", jwtAuth, getAllRequestsFromUser)
SwapRouter.get("/requests/:userB", getAllRequestsForUser)

SwapRouter.post("/swap", swapController)

SwapRouter.delete("/requests/:id", deleteRequest)





export default SwapRouter;