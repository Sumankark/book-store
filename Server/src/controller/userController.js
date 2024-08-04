import { User } from "../schema/model.js";
import bcrypt from "bcrypt";
import secretKey from "../../config.js"

export const createUser = async (req, res) => {
  try {
    const { userName, email, password, address } = req.body;

    if (!userName || !email || !password || !address) {
      return res.status(400).json({ message: "All filed is required" });
    }
    // check userName length is more than 2
    if (userName.length < 3) {
      return res
        .status(400)
        .json({ message: "username length should be greater than 2" });
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
      return res
        .status(400)
        .json({ message: "Password's must be greater than 6?" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "SignUp Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Signin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authclaims = [
          { name: existingUser.userName },
          { role: existingUser.role },
        ];

        const infoObj = {
          _id: User._id,
        };
        const expiresInfo = {
          expiresIn: "30d",
        };
        const token = await jwt.sign(infoObj, secretKey, expiresInfo)
        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

