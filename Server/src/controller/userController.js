import { secretKey } from "../../config.js";
import { User } from "../schema/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendemail.js";

export const createUser = async (req, res) => {
  try {
    const { userName, email, password, address } = req.body;

    if (!userName || !email || !password || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check userName length
    if (userName.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username length should be greater than 2 characters.",
      });
    }

    // Validate email domain
    const emailDomain = email.split("@")[1];
    if (emailDomain !== "gmail.com") {
      return res.status(400).json({
        success: false,
        message: "Only Gmail addresses are allowed.",
      });
    }

    // Check if userName already exists
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      address,
      isVerifiedEmail: false,
    });

    const result = await User.create(newUser);

    const infoObj = {
      id: result._id,
    };

    const expireInfo = {
      expiresIn: "1d",
    };

    const token = jwt.sign(infoObj, secretKey, expireInfo);

    // Send verification email
    await sendEmail({
      from: "'Houseobj' <karkisuman0627@gmail.com>",
      to: email,
      subject: "Account Creation",
      html: `
              <h1> Your account  has been created successfully </h1>
  
              <a href="http://localhost:3000/verify-email?token=${token}">http://localhost:3000/verify-email?token=${token}</a>
              `,
    });

    return res.status(201).json({
      success: true,
      message:
        "Sign up successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is required.",
      });
    }

    const token = tokenString.split(" ")[1];
    const infoObj = jwt.verify(token, secretKey);
    const userId = infoObj.id;

    const result = await User.findByIdAndUpdate(
      userId,
      { isVerifiedEmail: true },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User verified successfully.",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const Signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    if (!user.isVerifiedEmail) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const infoObj = { _id: user._id };
    const expireInfo = { expiresIn: "365d" };
    const token = jwt.sign(infoObj, secretKey, expireInfo);

    res.status(200).json({
      success: true,
      message: "User signed in successfully.",
      result: user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const userDetail = async (req, res) => {
  try {
    const id = req._id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details retrieved successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const updateDetail = async (req, res) => {
  try {
    const id = req._id;
    const { address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully.",
      address: updatedUser.address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
