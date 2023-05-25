import express from "express";
import { createSwapRequest } from "../controllers/swapController.js";
import { multerUpload } from "../middlewares/multer.js";

const SwapRouter = express.Router();

SwapRouter.post("/new",createSwapRequest )





export default SwapRouter;