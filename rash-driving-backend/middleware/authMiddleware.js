import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "secretkeyofrashapp123@#");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = { id: user._id, name: user.name };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
