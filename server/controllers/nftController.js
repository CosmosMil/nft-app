import NFTModel from "../models/nftModel.js"

const getAllNFTs = async (req, res) => {
  try {
    const NFT = await NFTModel.find().populate("owner");
    res.status(200).json(NFT);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong..."})
  }


}

const testNew = async (req, res) => {
try {
  const newNFT = new NFTModel({
    ...req.body
  })
  const result = await newNFT.save()
  res.send("check data")
} catch (error) {
  console.log(error)
}
}
export {getAllNFTs, testNew}