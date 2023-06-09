import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema({
  name: { type: String, required: false },
  price: { type: String, required: false },
  mintdate: { type: String, required: false },
  preview: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
  },
  { timestamps: true }
);

const NFTModel = mongoose.model("nft", NFTSchema);

export default NFTModel;
