import User from "../models/userModels.js";

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
  const newUser = new User({
    ...req.body,
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
