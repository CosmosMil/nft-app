import SwapModel from "../models/swapModel.js";
import swapNFTs from "../services/swapFunction.js";
import User from "../models/userModel.js";


const createSwapRequest = async (req, res) => {
 
  const user = req.body.userA;
  try {
    const newRequest = new SwapModel({
      ...req.body,
    });
    const result = await newRequest.save();
    await User.findByIdAndUpdate(user, {
      $push: { requests: result },
    });

    res.send(result);
    console.log("result: ", result);
  } catch (error) {
    console.log(error);
  }
};

const getAllRequestsFromUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await SwapModel.find({ userA: userId });
    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong..." });
  }
};
const getAllRequestsForUser = async (req, res) => {
  try {
    const id = req.params.userB;
    const swaps = await SwapModel.find({ userB: id })
      .populate('nftA')
      .populate('nftB');
 
    res.status(200).json(swaps);
  }
  catch (error) {
    res.status(500).json(error.message);
  }
}

const swapController = async (req, res) => {
  console.log("check userIds: ", req.body);
  const { userA, userB, nftA, nftB } = req.body;
  try {
    const result = await swapNFTs(userA, userB, nftA, nftB);
    
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Swap transaction failed");
  }
};
 


export { createSwapRequest, getAllRequestsFromUser, getAllRequestsForUser, swapController}
  

