// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Activity from "./pages/Activity"; // ✅ renamed

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/activity" element={<Activity />} />
        {/* <Route path="*" element={<div className="text-white bg-black p-6">404 Page Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
