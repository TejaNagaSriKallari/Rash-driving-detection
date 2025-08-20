// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "defaultsecret";

// // Named export for signup
// export const signup = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = new User({ email, password });
//         await user.save();
//         res.status(201).send("User created");
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// };

// // Named export for login
// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).send("Invalid credentials");

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).send("Invalid credentials");

//     const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
//     res.json({ token });
// };



// import User from "../models/User.js";
// import bcrypt from "bcryptjs";

// export const signup = async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({success:true, message: "User created successfully"});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).json({ message: "Incorrect password" });

//     res.json({ message: "Login successful", userId: user._id, username: user.username });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// 




import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET =process.env.JWT_SECRET;
// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Signup failed" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};
