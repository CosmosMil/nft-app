import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  minted: { type: String, required: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
  },
  { timestamps: true }
);

const NFTModel = mongoose.model("nft", NFTSchema);

export default NFTModel;
