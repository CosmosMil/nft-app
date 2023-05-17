import express from "express";
import {getAllNFTs, testNew, createCollection, getAllNFTsFromUser, addNFTInfo} from "../controllers/nftController.js"
import { multerUpload } from "../middlewares/multer.js";

const NFTRouter = express.Router();

NFTRouter.get("/all", getAllNFTs);
NFTRouter.get("/all/:id", getAllNFTsFromUser);

NFTRouter.post("/test", testNew);

//update info about NFT
NFTRouter.post("/update/", addNFTInfo);

//upload collection
NFTRouter.post("/collection", multerUpload.array("files", 6), createCollection);




export default NFTRouter;
