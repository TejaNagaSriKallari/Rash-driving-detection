// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../components/Header";

// export default function Result() {
//     const { state } = useLocation();
//     const navigate = useNavigate();

//     if (!state || !state.result) {
//         navigate("/home");
//         return null;
//     }

//     const { filename, result, confidence } = state.result;

//     return (
//         <div>
//             <Header />
//             <div className="p-8 text-center">
//                 <h2 className="text-2xl font-semibold mb-4">Detection Result</h2>
//                 <p><strong>Video:</strong> {filename}</p>
//                 <p><strong>Result:</strong> {result}</p>
//                 <p><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>
//                 <button 
//                     onClick={() => navigate("/home")}
//                     className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                     Detect Another Video
//                 </button>
//             </div>
//         </div>
//     );
// }



// import React from "react";
// import { useLocation } from "react-router-dom";

// export default function Result() {
//   const { state } = useLocation();
//   const video = state?.video;

//   if (!video) return <div>No result to show</div>;

//   return (
//     <div>
//       <h2>Video: {video.filename}</h2>
//       <p>Result: {video.result}</p>
//       <p>Confidence: {(video.confidence * 100).toFixed(2)}%</p>
//     </div>
//   );
// }




import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const video = state?.file?.mlResult;

  if (!video)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p className="text-2xl font-bold mb-6">No result to show</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    );

  const isRash = video.result === "Rash Driving";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white space-y-6">
      <h1 className="text-5xl font-extrabold tracking-wide mb-4 animate-pulse">
        Result
      </h1>

      <p className="text-3xl animate-fadeIn">🎬{video.filename}</p>

      <p
        className={`text-4xl font-bold px-6 py-2 rounded-full transition-colors duration-500 ${
          isRash ? "text-red-600 animate-pulse" : "text-green-500 animate-pulse"
        }`}
      >
        {video.result}
      </p>

      <p className="text-2xl animate-fadeIn">
        Confidence: {(video.confidence * 100).toFixed(2)}%
       
        </p> 

      <button
        onClick={() => navigate("/home")}
        className="px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300"
      >
        Detect Another Video
      </button>
    </div>
  );
}







