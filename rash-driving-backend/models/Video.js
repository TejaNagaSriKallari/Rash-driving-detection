// import mongoose from "mongoose";

// const videoSchema = new mongoose.Schema({
//     filename: String,
//     result: String,
//     confidence: Number,
//     createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Video", videoSchema);



import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  filename: String,
  result: String,
  confidence: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);
