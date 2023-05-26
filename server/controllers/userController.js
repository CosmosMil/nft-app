import User from "../models/userModel.js";
import { imageUpload } from "../utilities/imageManagement.js";
import { encryptPassword, verifyPassword } from "../utilities/bycript.js";
import { generateToken } from "../utilities/jwt.js";

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
    const user = await User.findById(id).populate("nfts");
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
  const encryptedPassword = await encryptPassword(req.body.password);
  const newUser = new User({
    ...req.body,
    password: encryptedPassword,
    avatar: avatar,
    NFTs: [],
  });

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
  const me = req.user;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        me._id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
    }
};
  
const login = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(404).json({ error: "no user found" });
      return;
    }
    if (existingUser) {
      const verified = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      if (!verified) {
        res.status(406).json({ error: "password doesn't match" });
      }
      if (verified) {
        const token = generateToken(existingUser);
        res.status(200).json({
          verified: true,
          token: token,
          user: {
            _id: existingUser._id,
            username: existingUser.username,
            NFTs: existingUser.NFTs,
            avatar: existingUser.avatar,
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "something went wrong.." });
  }
};

const getActiveUser = async (req, res) => {
  
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    username: req.user.username,
    avatar: req.user.avatar,
    NFTs: req.user.NFTs
})
}


export { testingRoute, getUsers, getUser, createUser, updateUser, login, getActiveUser}
