import { secretKey } from "../../config.js";
import { User } from "../schema/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { userName, email, password, address } = req.body;

    if (!userName || !email || !password || !address) {
      return res.status(400).json({ message: "All filed is required" });
    }
    // check userName length is more than 2
    if (userName.length < 3) {
      return res.status(400).json({
        success: false,
        message: "username length should be greater than 2",
      });
    }

    // check userName already exist?
    const existingUserName = await User.findOne({ userName: userName });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // check email already exist?
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // check password's length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password's must be greater than 6?",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "SignUp Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      let isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        let infoObj = {
          _id: user._id,
        };
        let expireInfo = {
          expiresIn: "30d",
        };

        let token = await jwt.sign(infoObj, secretKey, expireInfo);
        console.log(token);
        res.status(200).json({
          success: true,
          message: "User SignIn Successfully.",
          result: user,
          token: token,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid credentials.",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const userDetail = async (req, res) => {
  try {
    const user = await User.findById(req._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User detail retrived Succesfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateDetail = async (req, res) => {
  try {
    const { id } = req._id;
    const { address } = req.body;

    const newAddress = await findByIdAndUpdate(id, { address: address });
    res.status(200).json({
      success: true,
      message: "Address Update Successfully",
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
