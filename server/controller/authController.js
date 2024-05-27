import { User } from "../models/authModel.js";

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the controller home app!");
  } catch (error) {
    console.log("error");
  }
};

const signup = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, state, password, isAdmin } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      state,
      password,
      isAdmin,
    });

    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or passord " });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// *-------------------
// User Logic
// *-------------------

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json(userData);
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

export default { home, signup, signin, user};
