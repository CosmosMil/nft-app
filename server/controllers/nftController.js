import NFTModel from "../models/nftModel.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";

const getAllNFTs = async (req, res) => {
  console.log(req.params);
  try {
    const NFT = await NFTModel.find();
    res.status(200).json(NFT);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong..." });
  }
};

const getNFT = async (req, res) => {
  const id = req.params.id;
  try {
    const NFT = await NFTModel.findById(id)
    res.status(200).json(NFT);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error.message);
  }
};

const getAllNFTsFromUser = async (req, res) => {
  console.log(req.params)
  try {
    const userId = req.params.id;
    const NFTs = await NFTModel.find({owner: userId})
    res.status(200).json(NFTs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong..." });
  }
}

const createCollection = async (req, res) => {
  const ids = [];
  const user = req.user;
console.log(req.files)
  try {
    // console.log("req.body.owner:", req.body.owner);
    const uploadNFTs = req.files.map(async (file) => {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "nft-collections",
      });
      // console.log("result.public_id", uploadResult.public_id);
      ids.push(uploadResult.public_id);
      return {
        url: uploadResult.url,
        publicId: uploadResult.public_id,
      };
    });
    // console.log("uploadNFTs:", uploadNFTs);
    const uploadedNFTs = await Promise.all(uploadNFTs);

    // console.log("uploadedNFTs:", uploadedNFTs);

    const savedToMongo = uploadedNFTs.map(async (NFT) => {
      const NFTdoc = new NFTModel({
        owner: user._id,
        preview: NFT.url
      })
      const saved = await NFTdoc.save();
      return saved
      // console.log(saved)
      // savedArray.push(saved)
    })
    const savedArray = await Promise.all(savedToMongo);
    console.log(savedArray)

    await User.findByIdAndUpdate(user._id, {
      $push: { NFTs:  savedArray}
    })

    res.status(200).json({
      msg: "successfully uploaded",
      NFTarray: savedArray
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "error uploading NFTs",
      error: error,
    });
  }
};

const addNFTInfo = async (req, res) => {
  const { _id } = req.body;
  console.log("Request body: ", req.body); // Log the entire request body
  const update = {};
  if (req.body.name !== '') update.name = req.body.name;
  if (req.body.price !== '') update.price = req.body.price;
  if (req.body.mintdate !== '') update.mintdate = req.body.mintdate;
  try {
    const NFTInfo = await NFTModel.findOneAndUpdate(
      { _id : _id},
      update,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(NFTInfo);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
}
  
const getNFTInfo = async (req, res) => {
  try {
    const NFTid = req.body._id;
    const NFT = await NFTModel.findById(NFTid);
    res.status(200).json(NFT);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong..." });
  }
};


const testNew = async (req, res) => {
  try {
    const newNFT = new NFTModel({
      ...req.body,
    });
    const result = await newNFT.save();
    res.send("check data");
  } catch (error) {
    console.log(error);
  }
};

const deleteNFT = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await NFTModel.findByIdAndDelete(id);
    res.status(200).json({ message: "NFT deleted" });
  } catch (err) {
    res.status(500).json({ message: "failed to delete NFT", error: err.message });
   }
}


export { getAllNFTs, testNew, getNFT, createCollection, getAllNFTsFromUser, addNFTInfo, getNFTInfo, deleteNFT };
