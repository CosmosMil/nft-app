import { isDeferredData } from "@remix-run/router";
import NFTModel from "../models/nftModel.js";
import { v2 as cloudinary } from "cloudinary";

const getAllNFTs = async (req, res) => {
  try {
    const NFT = await NFTModel.find().populate("owner");
    res.status(200).json(NFT);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong..."})
  }


}

const createCollection = async (req, res) => {
  let ids = [];
  try {
  const uploadNFTs = req.files.map(async(file) => {
  const uploadResult = await cloudinary.uploader.upload(file.path, { folder: "nft-collections" });
  console.log("result.public_id", uploadResult.public_id);
  ids.push(uploadResult.public_id);
  return uploadResult.url;
});
let urls = await Promise.all(uploadNFTs);
let publicIds = ids;
res.status(200).json({
      urls,
      publicIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "error uploading NFTs",
      error: error,
    });
  }
};

const testNew = async (req, res) => {
try {
  const newNFT = new NFTModel({
    ...req.body
  })
  const result = await newNFT.save()
  res.send("check data")
} catch (error) {
  console.log(error)
}
}
export {getAllNFTs, testNew, createCollection}