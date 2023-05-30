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
  const { userA, userB, nftA, nftB } = req.body;
  try {
    const result = await swapNFTs(userA, userB, nftA, nftB);
    
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Swap transaction failed");
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting swap with id:", id);

  try {
    // remove swap from database
    const result = await SwapModel.findByIdAndDelete(id);
    
    res.status(200).json({ message: "request deleted" });
  } catch (err) {
    res.status(500).json({ message: "failed to delete request", error: err.message });
  }

}
 


export { createSwapRequest, getAllRequestsFromUser, getAllRequestsForUser, swapController, deleteRequest}
  

