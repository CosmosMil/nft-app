import express from "express";
import {getAllNFTs, testNew} from "../controllers/nftController.js"

const NFTRouter = express.Router();

NFTRouter.get("/all", getAllNFTs);
NFTRouter.post("/test", testNew)

export default NFTRouter;
