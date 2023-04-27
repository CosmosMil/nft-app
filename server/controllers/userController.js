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
    const user = await UserModel.findById(id);
    res.status(200).json(user)
  } catch (error) {
    // console.log(error);
    res.status(500).json({error: "something went wrong"})
  }
}

export { testingRoute, getUsers, getUser}
