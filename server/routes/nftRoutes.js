import express from "express";
import {getAllNFTs, testNew, createCollection, getAllNFTsFromUser} from "../controllers/nftController.js"
import { multerUpload } from "../middlewares/multer.js";

const NFTRouter = express.Router();

NFTRouter.get("/all", getAllNFTs);
NFTRouter.get("/all/:id", getAllNFTsFromUser);
NFTRouter.post("/test", testNew);

//upload collection
NFTRouter.post("/collection", multerUpload.array("files", 6), createCollection);




export default NFTRouter;
