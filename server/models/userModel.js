import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    NFTs: [{ type: mongoose.Schema.Types.ObjectId, ref: "nft" }],
    avatar: { type: String, default: "https://res.cloudinary.com/dte85mpkw/image/upload/v1683031892/users_profile_pics/placeholder_mehr42.jpg" },
    requests: [{type: mongoose.Schema.Types.ObjectId, ref: "swaps"}],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User