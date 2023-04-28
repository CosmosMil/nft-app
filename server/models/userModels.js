import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    NFTs: [ {type: mongoose. Schema.Types.ObjectId }]
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User