// import express from "express";
// import multer from "multer";
// import { uploadVideo, getAllVideos } from "../controllers/videoController.js";

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer();

// router.post("/upload", upload.single("video"), uploadVideo);
// router.get("/", getAllVideos);

// export default router;



// import express from "express";
// import Video from "../models/Video.js";

// const router = express.Router();

// router.post("/upload", async (req, res) => {
//   const { userId } = req.body; // or from JWT/session
//   if (!req.file) return res.status(400).send("No video uploaded");

//   // Save video info with userId
//   const video = new Video({
//     filename: req.file.originalname,
//     user: userId
//   });

//   await video.save();
//   res.json(video);
// });

// export default router;



// import express from "express";
// import multer from "multer";
// import Video from "../models/Video.js";
// import fs from "fs";
// import path from "path";

// const router = express.Router();


// const uploadsDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });

// // POST /api/video/upload
// router.post("/upload", upload.single("video"), async (req, res) => {
//   const { userId } = req.body; // if you pass it
//   if (!req.file) return res.status(400).json({ error: "No video uploaded" });

//   try {
//     const video = new Video({
//       filename: req.file.filename,
//       user: userId || null,
//     });

//     await video.save();
//     res.json({ success: true, video });
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Server error during upload" });
//   }
// });

// export default router;




import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import axios from "axios"; // for calling ML backend
import Video from "../models/Video.js";
import mongoose from "mongoose";

const router = express.Router();

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/upload", upload.single("video"), async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("File:", req.file);
  console.log("Body:", req.body);
  if (!req.file) return res.status(400).json({ error: "No video uploaded" });

  try {
    // Save video metadata
    const video = new Video({ filename: req.file.filename, user: req.body.userId || null });
   //  await video.save();


    const normalizedPath = path
      .join(uploadsDir, req.file.filename)
      .replace(/\\/g, "/");
    // Call ML backend
    const mlResponse = await axios.post("http://localhost:5000/predict", {
      videoPath: normalizedPath
    },
    { headers: { "Content-Type": "application/json" } }
  );
   video.result = mlResponse.data.result;
    video.confidence = mlResponse.data.confidence;
    await video.save();
    // Return both video info and ML prediction
    res.json({ success: true, video, mlResult:mlResponse.data});
  } catch (err) {
    if (err.response) {
      console.error("ML backend error:", err.response.data);
    } else {
      console.error("Upload/ML error:", err.message);
    }
    res.status(500).json({ error: "Server error during upload/ML processing" });
  
    // console.error("Upload/ML error:", err);
    // res.status(500).json({ error: "Server error during upload/ML processing" });
  }
});


router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }); // latest first
    res.json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});


// router.get("/videos", async (req, res) => {
//   try {
//     const {userId} = req.query; // frontend should pass ?userId=...
//     if (!userId) return res.status(400).json({ error: "User ID required" });

//     const videos = await Video.find({ user: mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
//     res.json(videos);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch videos" });
//   }
// });



// Delete a video by ID
router.delete("/videos/:id", async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Optionally delete the actual video file
    const filePath = path.join(process.cwd(), "uploads", video.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ success: true, message: "Video deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete video" });
  }
});

export default router;








