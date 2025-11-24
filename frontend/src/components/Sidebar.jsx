// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { 
//   FiHome, FiUsers, FiShield, FiTool, 
//   FiLogOut, FiEye, FiClock, FiCreditCard
// } from "react-icons/fi";

// const Sidebar = ({ role, onLogout }) => {
//   const location = useLocation();

//   const menuItems = {
//     admin: [
//       { name: "Dashboard", path: "/admin", icon: <FiHome /> },
//       { name: "Residents", path: "/admin/residents", icon: <FiUsers /> },
//       { name: "Guards", path: "/admin/guards", icon: <FiShield /> },
//       { name: "Staff", path: "/admin/staff", icon: <FiTool /> },
//       { name: "Visitors", path: "/admin/visitors", icon: <FiEye /> },
//       { name: "Guard Attendance", path: "/admin/attendance", icon: <FiClock /> },

//       // PAYMENT MODULE
//       { name: "Payments", path: "/payments/admin", icon: <FiCreditCard /> },

//       { name: "Rent Flats", path: "/rent", icon: <FiHome /> },
//     ],

//     resident: [
//       { name: "Dashboard", path: "/resident", icon: <FiHome /> },
//       { name: "Visitors", path: "/resident/visitors", icon: <FiUsers /> },

//       // PAYMENT MODULE
//       { name: "My Payments", path: "/payments/resident", icon: <FiCreditCard /> },

//       { name: "Rent Flats", path: "/rent", icon: <FiHome /> },
//     ],

//     guard: [
//       { name: "Dashboard", path: "/guard", icon: <FiHome /> },
//       { name: "Visitors", path: "/guard/visitors", icon: <FiUsers /> },
//       { name: "My Attendance", path: "/guard/attendance", icon: <FiClock /> },
//       { name: "Staff Attendance", path: "/guard/staff-attendance", icon: <FiUsers /> },
//     ],

//     staff: [
//       { name: "Dashboard", path: "/staff", icon: <FiHome /> },
//       { name: "Attendance", path: "/staff/attendance", icon: <FiClock /> },
//     ],
//   };

//   return (
//     <div className="w-64 h-screen bg-gradient-to-b from-purple-900 via-purple-600 to-purple-400 text-white flex flex-col shadow-xl">

//       {/* Logo */}
//       <div className="p-5 text-2xl font-bold border-b border-purple-800">
//         SocietyGate
//       </div>

//       {/* Menu */}
//       <ul className="flex-1 p-4 space-y-2">
//         {menuItems[role]?.map((item) => (
//           <li key={item.name}>
//             <Link
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
//                 location.pathname === item.path
//                   ? "bg-purple-700 text-white shadow-lg"
//                   : "text-gray-200 hover:bg-purple-700 hover:text-white"
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Logout */}
//       <button
//         onClick={onLogout}
//         className="m-4 p-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
//       >
//         <FiLogOut /> Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiShield,
  FiTool,
  FiLogOut,
  FiEye,
  FiClock,
  FiCreditCard,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Sidebar = ({ role, onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle

  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/admin", icon: <FiHome /> },
      { name: "Residents", path: "/admin/residents", icon: <FiUsers /> },
      { name: "Guards", path: "/admin/guards", icon: <FiShield /> },
      { name: "Staff", path: "/admin/staff", icon: <FiTool /> },
      { name: "Visitors", path: "/admin/visitors", icon: <FiEye /> },
      { name: "Guard Attendance", path: "/admin/attendance", icon: <FiClock /> },

      // PAYMENT MODULE
      { name: "Payments", path: "/payments/admin", icon: <FiCreditCard /> },

      { name: "Rent Flats", path: "/rent", icon: <FiHome /> },
    ],

    resident: [
      { name: "Dashboard", path: "/resident", icon: <FiHome /> },
      { name: "Visitors", path: "/resident/visitors", icon: <FiUsers /> },

      // PAYMENT MODULE
      { name: "My Payments", path: "/payments/resident", icon: <FiCreditCard /> },

      { name: "Rent Flats", path: "/rent", icon: <FiHome /> },
    ],

    guard: [
      { name: "Dashboard", path: "/guard", icon: <FiHome /> },
      { name: "Visitors", path: "/guard/visitors", icon: <FiUsers /> },
      { name: "My Attendance", path: "/guard/attendance", icon: <FiClock /> },
      { name: "Staff Attendance", path: "/guard/staff-attendance", icon: <FiUsers /> },
    ],

    staff: [
      { name: "Dashboard", path: "/staff", icon: <FiHome /> },
      { name: "Attendance", path: "/staff/attendance", icon: <FiClock /> },
    ],
  };

  return (
    <>
      {/* ==================== MOBILE HAMBURGER BUTTON (s & m screen only) ==================== */}
      <button
        className="fixed top-4 left-4 z-50 bg-purple-700 text-white p-2 rounded-lg s:block m:block lg:hidden xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* ==================== SIDEBAR ==================== */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-purple-900 via-purple-600 to-purple-400 
          text-white flex flex-col shadow-xl transition-transform duration-300
          
          /* Hidden by default on s & m */
          s:transform s:-translate-x-full
          m:transform m:-translate-x-full

          /* Visible when open */
          ${isOpen ? "translate-x-0" : ""}

          /* Always visible on lg & xl */
          lg:translate-x-0 xl:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-5 text-2xl font-bold border-b border-purple-800">
          SocietyGate
        </div>

        {/* Menu */}
        <ul className="flex-1 p-4 space-y-2">
          {menuItems[role]?.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)} // Auto close on mobile
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "bg-purple-700 text-white shadow-lg"
                    : "text-gray-200 hover:bg-purple-700 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          onClick={() => {
            setIsOpen(false);
            onLogout();
          }}
          className="m-4 p-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
