import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  userA: { type: String, required: true },
  userB: { type: String, required: true },
  nftA: { type: String, required: true },
  nftB: { type: String, required: true },
},
  { timestamps: true }
);

const SwapModel = mongoose.model("swap", swapSchema);

export default SwapModel