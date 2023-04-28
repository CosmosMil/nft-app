import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  minted: { type: Date, required: false },
  owner: { type: mongoose.Schema.Types.ObjectId }
  },
  { timestamps: true }
);

const NFTModel = mongoose.model("NFT", userSchema);

export default NFTModel;
