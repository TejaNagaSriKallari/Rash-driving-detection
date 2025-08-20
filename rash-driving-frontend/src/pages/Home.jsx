// import Header from "../components/Header";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//     const [video, setVideo] = useState(null);
//     const navigate = useNavigate();

//     const handleUpload = async () => {
//   if (!video) return alert("Please select a video first");

//   const formData = new FormData();
//   formData.append("video", video);

//   try {
//     const res = await axios.post(
//       "http://localhost:3001/api/videos/upload",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     navigate("/result", { state: { video: res.data } });
//   } catch (err) {
//     console.error("Upload failed:", err);
//     alert("Upload failed. Check console for details.");
//   }
// };


//     return (
//         <div>
//             <Header />
//             <div className="p-8 text-center">
//                 <h2 className="text-2xl font-semibold mb-4">Welcome to Rash Driving Detection</h2>
//                 <input 
//                     type="file" 
//                     onChange={e => setVideo(e.target.files[0])} 
//                     className="mb-4"
//                 />
//                 <br/>
//                 <button 
//                     onClick={handleUpload} 
//                     className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                     Upload & Detect
//                 </button>
//             </div>
//         </div>
//     );
// }




// import Header from "../components/Header";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Home({ user }) {
//   const [video, setVideo] = useState(null);
//   const navigate = useNavigate();

//   const handleUpload = async () => {
//     if (!user) return alert("Please signup or login to upload a video.");
//     if (!video) return alert("Please select a video first");

//     const formData = new FormData();
//     formData.append("video", video);

//     try {
//       const res = await axios.post(
//         "http://localhost:3001/api/videos/upload",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       navigate("/result", { state: { video: res.data } });
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed. Check console for details.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Header user={user} />

//       <div className="flex-1 flex flex-col items-center justify-center space-y-8">
//         <h2 className="text-4xl font-bold animate-pulse">
//           {user ? `Welcome, ${user.username}` : "Welcome"}
//         </h2>
//         <p className="text-xl animate-fadeIn">
//           {user
//             ? "Upload a video to check for rash driving"
//             : "Please signup or login to upload a video"}
//         </p>

//         <input
//           type="file"
//           onChange={(e) => setVideo(e.target.files[0])}
//           disabled={!user}
//           className="text-white file:bg-gray-700 file:text-white file:px-4 file:py-2 file:rounded-full file:border-none file:cursor-pointer disabled:opacity-50"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={!user}
//           className="px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
//         >
//           Upload & Detect
//         </button>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";

// export default function Home() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // ✅ Get username from localStorage (stored at login)
//   const username = localStorage.getItem("username") || "User";

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage("Please select a video to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", file);

//     try {
//       const res = await axios.post("http://localhost:3001/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       navigate("/result", { state: { result: res.data } });
//     } catch (err) {
//       setMessage("Upload failed. Try again.");
//       console.error("Upload error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       {/* ✅ Header with profile dropdown */}
//       <Header />

//       <div className="flex-1 flex flex-col items-center justify-center space-y-6">
//         <h1 className="text-3xl font-bold">Welcome, {username} 👋</h1>

//         {/* ✅ Upload box */}
//         <form
//           onSubmit={handleUpload}
//           className="flex flex-col items-center space-y-4 p-6 bg-gray-800 rounded-2xl shadow-lg"
//         >
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
//                        file:rounded-full file:border-0 file:text-sm 
//                        file:font-semibold file:bg-blue-600 file:text-white 
//                        hover:file:bg-blue-700"
//           />
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Upload Video
//           </button>
//         </form>

//         {message && <p className="text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";

// export default function Home() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const username = localStorage.getItem("username") || "User";

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     //e.preventDefault();
//   console.log("Upload triggered");
//     if (!file) {
//       setMessage("⚠️ Please select a video first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", file);
//     const userId = localStorage.getItem("userId"); 
//     if(userId){
//         formData.append("userId",userId);
//     }
//     try {
//       const res = await axios.post("http://localhost:3001/api/video/upload", formData,{
//        headers: { "Content-Type": "multipart/form-data" },
//      });

//       navigate("/result", { state: { file: res.data } });
//     } catch (err) {
//       setMessage("❌ Upload failed. Try again.");
//       console.error("Upload error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex flex-col">
//       {/* Header with profile dropdown */}
//       <Header />

//       {/* Main body */}
//       <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
//         {/* Big welcome text */}
//         <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg">
//           Welcome, {username}! 👋
//         </h1>

//         {/* Tagline */}
//         <p className="text-lg text-gray-300 max-w-xl">
//           Upload your driving videos below. Our AI will detect{" "}
//           <span className="text-red-400 font-semibold">rash driving</span> patterns
//           and give you instant results 🚦
//         </p>

//         {/* Upload form */}
//        {/* // <form onSubmit={handleUpload} className="flex flex-col items-center space-y-3" encType="multipart/form-data"> */}
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
//                        file:rounded-full file:border-0 file:text-sm 
//                        file:font-semibold file:bg-green-600 file:text-white 
//                        hover:file:bg-green-700"
//           />
//           <button
//             type="submit"
//             onClick={handleUpload}
//             className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-md"
//           >
//             🚀 Upload Video
//           </button>
//        {/* // </form> */}

//         {/* Status/Error messages */}
//         {message && <p className="text-red-400 font-semibold">{message}</p>}
//       </div>

//       {/* Footer */}
//       <footer className="text-center py-4 text-gray-500 text-sm">
//         Made with ❤️ for safer roads 🛣️
//       </footer>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";

// export default function Home() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const username = localStorage.getItem("username");

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!username) {
//       setMessage("⚠️ Please login to upload the video.");
//       return;
//     }

//     if (!file) {
//       setMessage("⚠️ Please select a video first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", file);
//     const userId = localStorage.getItem("userId");
//     if (userId) formData.append("userId", userId);

//     try {
//       const res = await axios.post(
//         "http://localhost:3001/api/video/upload",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       navigate("/result", { state: { file: res.data } });
//     } catch (err) {
//       setMessage("❌ Upload failed. Try again.");
//       console.error("Upload error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex flex-col">
//       {/* Header with profile dropdown */}
//       <Header />

//       {/* Main body */}
//       <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
//         {/* Big welcome text */}
//         <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg">
//           Welcome, {username || "Guest"}! 👋
//         </h1>

//         {/* Tagline */}
//         <p className="text-lg text-gray-300 max-w-xl">
//           Upload your driving videos below. Our AI will detect{" "}
//           <span className="text-red-400 font-semibold">rash driving</span> patterns
//           and give you instant results 🚦
//         </p>

//         {/* Upload form */}
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setFile(e.target.files[0])}
//           className={`text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
//                        file:rounded-full file:border-0 file:text-sm 
//                        file:font-semibold ${
//                          username ? "file:bg-green-600 hover:file:bg-green-700" : "file:bg-gray-600 cursor-not-allowed"
//                        } file:text-white`}
//           disabled={!username}
//         />
//         <button
//           type="submit"
//           onClick={handleUpload}
//           className={`px-8 py-3 rounded-lg transition-colors font-bold text-lg shadow-md ${
//             username ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"
//           }`}
//           disabled={!username}
//         >
//           🚀 Upload Video
//         </button>

//         {/* Status/Error messages */}
//         {message && <p className="text-red-400 font-semibold">{message}</p>}
//       </div>

//       {/* Footer */}
//       <footer className="text-center py-4 text-gray-500 text-sm">
//         Made with ❤️ for safer roads 🛣️
//       </footer>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const username = localStorage.getItem("username"); // null if not logged in

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("Upload triggered");

    if (!username) {
      setMessage("⚠️ Please login to upload the video.");
      return; // prevent upload
    }

    if (!file) {
      setMessage("⚠️ Please select a video first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    const userId = localStorage.getItem("userId");

//     if (!userId || userId === "undefined") {
//   setMessage("⚠️ Please login to upload the video.");
//   return;
// }
   

    if (userId && userId!=="undefined")  formData.append("userId", userId);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/video/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate("/result", { state: { file: res.data } });
    } catch (err) {
      setMessage("❌ Upload failed. Try again.");
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex flex-col">
      {/* Header with profile dropdown */}
      <Header />

      {/* Main body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        {/* Big welcome text */}
        <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg">
          Welcome, {username || "Guest"}! 👋
        </h1>

        {/* Tagline */}
        <p className="text-lg text-gray-300 max-w-xl">
          Upload your driving videos below. Our AI will detect{" "}
          <span className="text-red-400 font-semibold">rash driving</span> patterns
          and give you instant results 🚦
        </p>

        {/* Login warning for guests */}
        {!username && (
          <p className="text-yellow-400 font-semibold">
            ⚠️ Please login to upload the video.
          </p>
        )}

        {/* Upload form */}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm 
                     file:font-semibold file:bg-green-600 file:text-white 
                     hover:file:bg-green-700"
        />
        <button
          type="submit"
          onClick={handleUpload}
          className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-md"
        >
          🚀 Upload Video
        </button>

        {/* Status/Error messages */}
        {message && <p className="text-red-400 font-semibold">{message}</p>}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        Made with ❤️ for safer roads 🛣️
      </footer>
    </div>
  );
}
