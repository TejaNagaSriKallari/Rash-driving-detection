// // import express from "express";
// // import mongoose from "mongoose";
// // import videoRoutes from "./routes/videoRoutes.js";

// // const app = express();
// // app.use(express.json());

// // // Enable CORS if frontend is on different port
// // import cors from "cors";
// // app.use(cors({ origin: "http://localhost:5173" })); // replace with your frontend port

// // app.use("/api/videos", videoRoutes);

// // mongoose.connect("mongodb://127.0.0.1:27017/rashDriving", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// //   .then(() => console.log("MongoDB connected"))
// //   .catch(err => console.error(err));

// // app.listen(3001, () => console.log("Server running on port 3001"));



// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import videoRoutes from "./routes/videoRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import multer from "multer";

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Memory storage for multer
// const upload = multer(); 
// app.use("/api/videos", videoRoutes);
// app.use("/api/auth", authRoutes);

// mongoose.connect("mongodb://127.0.0.1:27017/rashDriving", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.error(err));

// app.listen(3001, () => console.log("Server running on port 3001"));




import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js"; // your rash detection upload/results

dotenv.config();
const app = express();

app.use(cors());
//app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3001, () => console.log("Server running on http://localhost:3001"));
  })
  .catch(err => console.error(err));
