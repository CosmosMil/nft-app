import User from "../models/userModels.js";
import { imageUpload } from "../utilities/imageManagement.js";

const testingRoute = (req, res) => {
  res.send("testing route....");
}

const getUsers = async (req, res) => {
   try {
     const users = await User.find();
     console.log(users);
    res.status(200).json(users);
   } catch (e) {
     res.status(500).json({error: "something went wrong..."})
    console.log(e);
  }
}

const getUser = async (req, res) => {
  const id = req.params;
  try {
    const user = await UserModel.findById(id).populate("nfts");
    res.status(200).json(user)
  } catch (error) {
    // console.log(error);
    res.status(500).json({error: "something went wrong"})
  }
}

const createUser = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(406).json({ error: "Please fill out all fields" });
  }
  const avatar = await imageUpload(req.file, "user_profile_pics");
  console.log(avatar);
  const newUser = new User({
    ...req.body,
    avatar: avatar,
    NFTs: [],
  })

  try {
    const registeredUser = await newUser.save();
    res.status(200).json({
      message: "successfully registered!",
      newUser: registeredUser
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).json("something went wrong..")
  }

}

const updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
    }
  };


export { testingRoute, getUsers, getUser, createUser, updateUser}
