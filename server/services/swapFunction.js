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
    console.log("userA ", userAId)
    const userBId = await User.findById(userB).session(session);
    console.log("userB ", userBId);


    //find the NFT documents
    const nftADoc = await NFTModel.findOne({ _id: nftA, owner: userA }).session(
      session
    );
    console.log("nftA", nftADoc);
    const nftBDoc = await NFTModel.findOne({ _id: nftB, owner: userB }).session(
      session
    );
    console.log("nftB", nftBDoc);

    //make sure each user owns the NFT they are swapping
    if (
      !nftADoc ||
      !nftBDoc ||
      !userAId ||
      !userBId
    ) {
      throw new Error(
        "one document is missing"
      );
    }

    // Swap the NFT owners
    nftADoc.owner = userBId._id;
    nftBDoc.owner = userAId._id;

    // Remove the NFTs from each user's NFT array
    userAId.NFTs = userAId.NFTs.filter(
      (nft) => nft !== nftA
    );
    userBId.NFTs = userBId.NFTs.filter(
      (nft) => nft !== nftB
    );

    // Give each user the new item
    userAId.NFTs.push(nftB);
    userBId.NFTs.push(nftA);

    // Save the updated NFT documents
    await nftADoc.save(opts);
    await nftBDoc.save(opts);

    // Save the updated users
    await userAId.save(opts);
    await userBId.save(opts);

    //commit the transaction
    await session.commitTransaction();
    return { message: "swap succeeded" };
  } catch (error) {
    console.log("swap failed", error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
  
};


export default swapNFTs;