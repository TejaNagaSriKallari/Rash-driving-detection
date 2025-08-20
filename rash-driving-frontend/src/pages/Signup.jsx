// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export default function Signup() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSignup = async () => {
//         await axios.post("http://localhost:3001/api/auth/signup", { email, password });
//         navigate("/");
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="p-8 border rounded shadow-md w-96">
//                 <h2 className="text-2xl mb-4 text-center font-semibold">Signup</h2>
//                 <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-2 p-2 border rounded"/>
//                 <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded"/>
//                 <button onClick={handleSignup} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Signup</button>
//                 <p className="mt-2 text-center">Already have an account? <Link to="/" className="text-blue-600">Login</Link></p>
//             </div>
//         </div>
//     );
// }



// src/pages/Signup.jsx
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function Signup() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setMessage("Signup successful! Redirecting to login...");
        //setTimeout(() => 
          navigate("/login");
      }else{
        setMessage(res.data.message)
      }
    } catch (err) {
      if (err.response?.data?.message === "User already exists") {
        setMessage("User already exists! Please login.");
      } else {
        setMessage("Signup failed. Try again.");
      }
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header hideAuthLinks={true} />
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <h2 className="text-4xl font-bold animate-pulse">Sign Up</h2>
        <form
          onSubmit={handleSignup}
          className="flex flex-col space-y-4 w-80"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="text-red-500 text-center text-lg">{message}</p>
        )}

        <p className="text-gray-400">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
