import express from "express";
import {getAllNFTs} from "../controllers/nftController.js"

const NFTRouter = express.Router();

NFTRouter.get("/all", getAllNFTs);


export default NFTRouter;
