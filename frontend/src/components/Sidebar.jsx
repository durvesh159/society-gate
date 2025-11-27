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


import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome, FiUsers, FiShield, FiTool,
  FiLogOut, FiEye, FiClock, FiCreditCard
} from "react-icons/fi";

const Sidebar = ({ role, onLogout, isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/admin", icon: <FiHome /> },
      { name: "Residents", path: "/admin/residents", icon: <FiUsers /> },
      { name: "Guards", path: "/admin/guards", icon: <FiShield /> },
      { name: "Staff", path: "/admin/staff", icon: <FiTool /> },
      { name: "Visitors", path: "/admin/visitors", icon: <FiEye /> },
      { name: "Guard Attendance", path: "/admin/attendance", icon: <FiClock /> },
      { name: "Payments", path: "/payments/admin", icon: <FiCreditCard /> },
      { name: "Rent Flats", path: "/rent", icon: <FiHome /> },
    ],

    resident: [
      { name: "Dashboard", path: "/resident", icon: <FiHome /> },
      { name: "Visitors", path: "/resident/visitors", icon: <FiUsers /> },
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
    <div
      className={`
        fixed top-0 left-0 h-full z-40 flex flex-col
        w-64 bg-gradient-to-b from-purple-900 via-purple-600 to-purple-400 text-white shadow-xl
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-64"}
        lg:translate-x-0 lg:static
      `}
    >
      {/* Logo */}
<div className="p-3 border-b border-purple-800 flex justify-between items-center">
   <div className="bg-white/60 opacity- rounded-xl p-2 shadow-md flex items-center justify-center w-full">
    <img
      src="/DWI_logo.png"
      alt="Company Logo"
      className="h-14 w-auto object-contain"
    />
  </div>

        {/* Close for mobile */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Menu */}
      <ul className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems[role]?.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={() => toggleSidebar(false)}
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

      {/* Logout button fixed at bottom, full width */}
      <div className="p-4">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

