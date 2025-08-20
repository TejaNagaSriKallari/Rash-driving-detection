// import { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// export default function Header() {
//     const [showDropdown, setShowDropdown] = useState(false);
//     const navigate = useNavigate();

//     const handleSignOut = () => {
//         // remove token or user info if stored
//         navigate("/");
//     };

//     return (
//         <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
//             <h1 className="text-xl font-bold">Rash Driving Detection</h1>
//             <div className="relative">
//                 <FaUserCircle 
//                     size={30} 
//                     className="cursor-pointer"
//                     onClick={() => setShowDropdown(!showDropdown)}
//                 />
//                 {showDropdown && (
//                     <div className="absolute right-0 mt-2 w-36 bg-white text-black rounded shadow-lg">
//                         <Link to="/activity" className="block px-4 py-2 hover:bg-gray-200">Activity</Link>
//                         <button 
//                             onClick={handleSignOut} 
//                             className="w-full text-left px-4 py-2 hover:bg-gray-200"
//                         >
//                             Sign Out
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </header>
//     );
// }




// import { Link } from "react-router-dom";

// export default function Header({ user }) {
//   return (
//     <header className="w-full bg-black text-white py-4 px-8 flex justify-between items-center shadow-md">
//       <h1 className="text-2xl font-bold">Rash Driving Detection</h1>

//       <nav className="space-x-4">
//         {user ? (
//           <Link
//             to="/logout"
//             className="hover:text-gray-400 transition-colors duration-200"
//           >
//             Logout
//           </Link>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="hover:text-gray-400 transition-colors duration-200"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="hover:text-gray-400 transition-colors duration-200"
//             >
//               Signup
//             </Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }




// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa"; // profile icon

// export default function Header({ hideAuthLinks }) {
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     navigate("/login");
//   };

//   return (
//     <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
//       <h1
//         className="text-2xl font-bold cursor-pointer"
//         onClick={() => navigate("/")}
//       >
//         Rash Driving Detection
//       </h1>

//       {username ? (
//         <div className="relative group">
//           <FaUserCircle size={28} className="cursor-pointer" />
//           <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg hidden group-hover:block">
//             <p className="px-4 py-2 border-b border-gray-700">
//               {username}
//             </p>
//             <p
//               onClick={() => navigate("/activity")}
//               className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
//             >
//               Activity
//             </p>
//             <p
//               onClick={handleLogout}
//               className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
//             >
//               Sign Out
//             </p>
//           </div>
//         </div>
//       ) : (
//         !hideAuthLinks && (
//           <div className="space-x-4">
//             <button
//               onClick={() => navigate("/login")}
//               className="hover:underline"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => navigate("/signup")}
//               className="hover:underline"
//             >
//               Sign Up
//             </button>
//           </div>
//         )
//       )}
//     </header>
//   );
// }




import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // profile icon

export default function Header({ hideAuthLinks }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Rash Driving Detection
      </h1>

      {username ? (
        <div className="relative" ref={menuRef}>
          <FaUserCircle
            size={28}
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg z-50">
              <p className="px-4 py-2 border-b border-gray-700 font-semibold">
                {username}
              </p>
              <p
                onClick={() => {
                  navigate("/activity");
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                Activity
              </p>
              <p
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-500 font-semibold"
              >
                Sign Out
              </p>
            </div>
          )}
        </div>
      ) : (
        !hideAuthLinks && (
          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="hover:underline"
            >
              Sign Up
            </button>
          </div>
        )
      )}
    </header>
  );
}
