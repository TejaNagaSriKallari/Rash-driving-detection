// import Header from "../components/Header";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Activity() {
//     const [videos, setVideos] = useState([]);

//     useEffect(() => {
//         const fetchActivity = async () => {
//             const res = await axios.get("http://localhost:3001/api/videos"); // API to fetch all videos
//             setVideos(res.data);
//         };
//         fetchActivity();
//     }, []);

//     return (
//         <div>
//             <Header />
//             <div className="p-8">
//                 <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
//                 <table className="min-w-full bg-white">
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border">Video</th>
//                             <th className="py-2 px-4 border">Result</th>
//                             <th className="py-2 px-4 border">Confidence</th>
//                             <th className="py-2 px-4 border">Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {videos.map(v => (
//                             <tr key={v._id}>
//                                 <td className="py-2 px-4 border">{v.filename}</td>
//                                 <td className="py-2 px-4 border">{v.result}</td>
//                                 <td className="py-2 px-4 border">{(v.confidence*100).toFixed(2)}%</td>
//                                 <td className="py-2 px-4 border">{new Date(v.createdAt).toLocaleString()}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }







// import Header from "../components/Header";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Activity() {
//     const [videos, setVideos] = useState([]);

//     useEffect(() => {
//         const fetchActivity = async () => {
//             const res = await axios.get("http://localhost:3001/api/video/videos");
//             setVideos(res.data);
//         };
//         fetchActivity();
//     }, []);

//     return (
//         <div className="min-h-screen bg-black text-white">
//             <Header />
//             <div className="p-8">
//                 <h2 className="text-3xl font-bold mb-6">Your Activity</h2>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full border border-gray-700">
//                         <thead className="bg-gray-900 text-gray-300">
//                             <tr>
//                                 <th className="py-2 px-4 border border-gray-700">Video</th>
//                                 <th className="py-2 px-4 border border-gray-700">Result</th>
//                                 <th className="py-2 px-4 border border-gray-700">Confidence</th>
//                                 <th className="py-2 px-4 border border-gray-700">Date</th>
//                             </tr>
//                         </thead>
//                         <tbody className="text-gray-200">
//                             {videos.map(v => (
//                                 <tr key={v._id} className="hover:bg-gray-800 transition-colors">
//                                     <td className="py-2 px-4 border border-gray-700">{v.filename}</td>
//                                     <td className={`py-2 px-4 border border-gray-700 font-bold ${v.result === "Rash Driving" ? "text-red-500" : "text-green-500"}`}>{v.result}</td>
//                                     <td className="py-2 px-4 border border-gray-700">{v.confidence ? (v.confidence * 100).toFixed(2) + "%" : "N/A"}</td>
//                                     <td className="py-2 px-4 border border-gray-700">{new Date(v.createdAt).toLocaleString()}</td>
//                                 </tr>
//                             ))}
//                             {videos.length === 0 && (
//                                 <tr>
//                                     <td colSpan={4} className="text-center py-4 text-gray-400">
//                                         No videos uploaded yet
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }





import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Activity() {
  const [videos, setVideos] = useState([]);

//  // Fetch all videos on mount
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/video/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };
    fetchActivity();
  }, []);



//    useEffect(() => {
//   const fetchActivity = async () => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return; // or show a "please login" message

//     try {
//       const res = await axios.get(`http://localhost:3001/api/video/videos?userId=${userId}`);
//       setVideos(res.data);
//     } catch (err) {
//       console.error("Failed to fetch videos:", err);
//     }
//   };
//   fetchActivity();
// }, []);



  // Delete a video
  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/video/videos/${videoId}`);
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete video. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Your Activity</h2>

        {videos.length === 0 ? (
          <p className="text-gray-400">No videos uploaded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="py-2 px-4 border border-gray-700">Video</th>
                  <th className="py-2 px-4 border border-gray-700">Result</th>
                  <th className="py-2 px-4 border border-gray-700">Confidence</th>
                  <th className="py-2 px-4 border border-gray-700">Date</th>
                  <th className="py-2 px-4 border border-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((v) => (
                  <tr key={v._id} className="hover:bg-gray-800 transition-colors">
                    <td className="py-2 px-4 border border-gray-700">{v.filename}</td>
                    <td
                      className={`py-2 px-4 border border-gray-700 font-bold ${
                        v.result === "Rash Driving" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {v.result || "N/A"}
                    </td>
                    <td className="py-2 px-4 border border-gray-700">
                      {v.confidence !== undefined && v.confidence !== null
                        ? (v.confidence * 100).toFixed(2) + "%"
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 border border-gray-700">
                      {new Date(v.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border border-gray-700">
                      <button
                        onClick={() => handleDelete(v._id)}
                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-white text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
