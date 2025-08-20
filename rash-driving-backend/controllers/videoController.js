// import Video from "../models/Video.js";
// import { spawn } from "child_process";
// import fs from "fs";
// import path from "path";

// export const uploadVideo = async (req, res) => {
//   if (!req.file) return res.status(400).send("No video uploaded");

//   const tempPath = path.resolve("uploads", req.file.originalname);
//   fs.writeFileSync(tempPath, req.file.buffer);

//   const python = spawn("python", ["predict_rash.py", tempPath]);

//   let outputData = "";

//   python.stdout.on("data", (data) => {
//     outputData += data.toString();
//   });

//   python.stderr.on("data", (data) => {
//     console.error("Python stderr:", data.toString());
//   });

//   python.on("close", async () => {
//     try {
//       const lines = outputData.trim().split("\n");
//       let parsed = null;
//       for (let i = lines.length - 1; i >= 0; i--) {
//         try {
//           parsed = JSON.parse(lines[i]);
//           break;
//         } catch (err) {
//           continue;
//         }
//       }

//       if (!parsed) throw new Error("No valid JSON output from Python");

//       const { result, confidence } = parsed;

//       const video = new Video({
//         filename: req.file.originalname,
//         result,
//         confidence
//       });
//       await video.save();

//       res.json(video);
//     } catch (err) {
//       console.error("Error parsing Python output:", outputData, err);
//       res.status(500).send("Prediction failed");
//     } finally {
//       if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//     }
//   });
// };

// // ✅ Make sure getAllVideos is exported too
// export const getAllVideos = async (req, res) => {
//   try {
//     const videos = await Video.find().sort({ createdAt: -1 });
//     res.json(videos);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };



import Video from "../models/Video.js";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export const uploadVideo = async (req, res) => {
  try {
    const { userId } = req.body; // user who uploads video
    if (!req.file) return res.status(400).send("No video uploaded");

    const tempPath = path.resolve("uploads", req.file.originalname);
    fs.writeFileSync(tempPath, req.file.buffer);

    const python = spawn("python", ["predict_rash.py", tempPath]);
    let outputData = "";

    python.stdout.on("data", (data) => {
      outputData += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("Python stderr:", data.toString());
    });

    python.on("close", async (code) => {
      try {
        const lines = outputData.trim().split("\n");
        let parsed = null;
        for (let i = lines.length - 1; i >= 0; i--) {
          try { parsed = JSON.parse(lines[i]); break; } catch { continue; }
        }

        if (!parsed) throw new Error("No valid JSON output from Python");
        const { result, confidence } = parsed;

        const video = new Video({
          filename: req.file.originalname,
          result,
          confidence,
          user: userId
        });
        await video.save();

       // res.json(video);

       res.json({
          filename: video.filename,
          result: video.result,
          confidence: video.confidence
        });
      } catch (err) {
        console.error("Error parsing Python output:", outputData, err);
        res.status(500).send("Prediction failed");
      } finally {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
