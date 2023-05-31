import express from "express";
import {getAllNFTs, testNew, createCollection, getAllNFTsFromUser, addNFTInfo, getNFTInfo, getNFT, deleteNFT} from "../controllers/nftController.js"
import { multerUpload } from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js"

const NFTRouter = express.Router();

NFTRouter.get("/id/:id", getNFT);
NFTRouter.get("/all", getAllNFTs);
NFTRouter.get("/all/:id", getAllNFTsFromUser);

NFTRouter.post("/test", testNew);

//update info about NFT
NFTRouter.post("/update", addNFTInfo);
NFTRouter.get("/info", getNFTInfo)

//upload collection
NFTRouter.post("/collection", jwtAuth, multerUpload.array("files", 6), createCollection);

NFTRouter.delete("/delete/:id", deleteNFT )




export default NFTRouter;
