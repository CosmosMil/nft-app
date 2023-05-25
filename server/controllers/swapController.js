import SwapModel from "../models/swapModel.js";
import { v2 as cloudinary } from "cloudinary";

const createSwapRequest = async (req, res) => {
  try {
    const newRequest = new SwapModel({
      ...req.body,
    });
    const result = await newRequest.save();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { createSwapRequest}
  

