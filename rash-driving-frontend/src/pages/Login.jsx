// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         // Call backend login API
//         const res = await axios.post("http://localhost:3001/api/auth/login", { email, password });
//         // save token if returned
//         navigate("/home");
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="p-8 border rounded shadow-md w-96">
//                 <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>
//                 <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-2 p-2 border rounded"/>
//                 <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded"/>
//                 <button onClick={handleLogin} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
//                 <p className="mt-2 text-center">Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></p>
//             </div>
//         </div>
//     );
// }




// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        setMessage("Login successful! Redirecting...");
        localStorage.setItem("token", res.data.token); // ✅ store JWT
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("userId",res.data.user._id);
        //setTimeout(() => 
          navigate("/home"); // redirect to home
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg === "Invalid credentials") {
        setMessage("Invalid email or password.");
      }else if(msg==="User not found"){
        setMessage("No account with this email. Please sign up.");
      }
       else {
        setMessage("Login failed. Try again.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header hideAuthLinks={true} />
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <h2 className="text-4xl font-bold animate-pulse">Login</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-4 w-80"
        >
          <input
            type="email"
            autoComplete="off"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800  border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            autoComplete="off"
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
            Login
          </button>
        </form>

        {message && (
          <p className="text-red-500 text-center text-lg">{message}</p>
        )}

        <p className="text-gray-400">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
