import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    NFTs: [{ type: mongoose.Schema.Types.ObjectId, ref: "nft" }],
  },
  { timestamps: true }
);

const Collection = mongoose.model("collection", collectionSchema);

export default Collection