import SwapModel from "../models/swapModel.js";
import conn from "../utilities/connection.js";
import User from "../models/userModel.js";
import NFTModel from "../models/nftModel.js";

const swapNFTs = async (userA, userB, nftA, nftB) => {
  const session = await conn.startSession();
  session.startTransaction();

  try {
    const opts = { session, new: true };

    // get the users
    const userAId = await User.findById(userA).session(session);
    const userBId = await User.findById(userB).session(session);

    //find the NFT documents
    const nftADoc = await NFTModel.findOne({ _id: nftA, owner: userA }).session(
      session
    );
    const nftBDoc = await NFTModel.findOne({ _id: nftB, owner: userB }).session(
      session
    );

    //make sure each user owns the NFT they are swapping
    if (
      !nftADoc ||
      !nftBDoc ||
      !nftADoc.owner.equals(userAId._id) ||
      !nftBDoc.owner.equals(userBId._id)
    ) {
      throw new Error(
        "one of the users doesn't own the NFT they are trying to swap"
      );
    }

    // Swap the NFT owners
    nftADoc.owner = userBId._id;
    nftBDoc.owner = userAId._id;

    // Save the updated NFT documents
    await nftADoc.save(opts);
    await nftBDoc.save(opts);

    //commit the transaction
    await session.commitTransaction();
    console.log("swap succeeded");
  } catch (error) {
    console.log("swap failed", error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
  
};


export default swapNFTs;