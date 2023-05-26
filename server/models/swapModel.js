import mongoose from "mongoose";

const swapSchema = new mongoose.Schema(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userB: { type: mongoose.Schema.Types.ObjectId,
      ref: "user", required: true },
    nftA: { type: mongoose.Schema.Types.ObjectId,
      ref: "nft", required: true },
    nftB: { type: mongoose.Schema.Types.ObjectId,
      ref: "nft", required: true },
  },
  { timestamps: true }
);

const SwapModel = mongoose.model("swap", swapSchema);

export default SwapModel