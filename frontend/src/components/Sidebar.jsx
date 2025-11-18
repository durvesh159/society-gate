// // src/components/Sidebar.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FiHome, FiUsers, FiShield, FiTool, FiLogOut } from "react-icons/fi";

// const Sidebar = ({ role, onLogout }) => {
//   const location = useLocation();

//   const menuItems = {
//     admin: [
//       { name: "Dashboard", path: "/admin", icon: <FiHome /> },
//       { name: "Residents", path: "/admin/residents", icon: <FiUsers /> },
//       { name: "Guards", path: "/admin/guards", icon: <FiShield /> },
//       { name: "Staff", path: "/admin/staff", icon: <FiTool /> },
//     ],
//     resident: [
//       { name: "Dashboard", path: "/resident", icon: <FiHome /> },
//     ],
//     guard: [
//       { name: "Dashboard", path: "/guard", icon: <FiHome /> },
//     ],
//     staff: [
//       { name: "Dashboard", path: "/staff", icon: <FiHome /> },
//     ],
//   };

//   return (
//     <div className="w-64 h-screen bg-linear-to-b from-blue-800 to-blue-900 text-white flex flex-col shadow-lg">
//       <div className="p-5 text-2xl font-bold border-b border-blue-700">
//         SocietyGate
//       </div>
//       <ul className="flex-1 p-4 space-y-2">
//         {menuItems[role]?.map((item) => (
//           <li key={item.name}>
//             <Link
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
//                 location.pathname === item.path
//                   ? "bg-blue-700 text-white"
//                   : "text-gray-200 hover:bg-blue-700 hover:text-white"
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <button
//         onClick={onLogout}
//         className="m-4 p-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2"
//       >
//         <FiLogOut /> Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;



// // src/components/Sidebar.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FiHome, FiUsers, FiShield, FiTool, FiLogOut, FiEye } from "react-icons/fi";

// const Sidebar = ({ role, onLogout }) => {
//   const location = useLocation();

//   const menuItems = {
//     admin: [
//       { name: "Dashboard", path: "/admin", icon: <FiHome /> },
//       { name: "Residents", path: "/admin/residents", icon: <FiUsers /> },
//       { name: "Guards", path: "/admin/guards", icon: <FiShield /> },
//       { name: "Staff", path: "/admin/staff", icon: <FiTool /> },
//       { name: "Visitors", path: "/admin/visitors", icon: <FiEye /> },
//     ],
//     resident: [
//   { name: "Dashboard", path: "/resident", icon: <FiHome /> },
//   { name: "Visitors", path: "/resident/visitors", icon: <FiUsers /> },
// ],

//     guard: [
//   { name: "Dashboard", path: "/guard", icon: <FiHome /> },
//   { name: "Visitors", path: "/guard/visitors", icon: <FiUsers /> },
// ],

//     staff: [{ name: "Dashboard", path: "/staff", icon: <FiHome /> }],
//   };

//   return (
//     <div className="w-64 h-screen bg-linear-to-b from-blue-800 to-blue-900 text-white flex flex-col shadow-lg">
//       <div className="p-5 text-2xl font-bold border-b border-blue-700">
//         SocietyGate
//       </div>
//       <ul className="flex-1 p-4 space-y-2">
//         {menuItems[role]?.map((item) => (
//           <li key={item.name}>
//             <Link
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
//                 location.pathname === item.path
//                   ? "bg-blue-700 text-white"
//                   : "text-gray-200 hover:bg-blue-700 hover:text-white"
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={onLogout}
//         className="m-4 p-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2"
//       >
//         <FiLogOut /> Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;



// // src/components/Sidebar.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FiHome, FiUsers, FiShield, FiTool, FiLogOut, FiEye } from "react-icons/fi";

// const Sidebar = ({ role, onLogout }) => {
//   const location = useLocation();

//   const menuItems = {
//     admin: [
//       { name: "Dashboard", path: "/admin", icon: <FiHome /> },
//       { name: "Residents", path: "/admin/residents", icon: <FiUsers /> },
//       { name: "Guards", path: "/admin/guards", icon: <FiShield /> },
//       { name: "Staff", path: "/admin/staff", icon: <FiTool /> },
//       { name: "Visitors", path: "/admin/visitors", icon: <FiEye /> },
//     ],
//     resident: [
//       { name: "Dashboard", path: "/resident", icon: <FiHome /> },
//       { name: "Visitors", path: "/resident/visitors", icon: <FiUsers /> },
//     ],
//     guard: [
//       { name: "Dashboard", path: "/guard", icon: <FiHome /> },
//       { name: "Visitors", path: "/guard/visitors", icon: <FiUsers /> },
//     ],
//     staff: [
//       { name: "Dashboard", path: "/staff", icon: <FiHome /> },
//     ],
//   };

//   return (
//     <div className="w-64 h-screen bg-gradient-to-b from-purple-900 via-purple-500 to-purple-300 text-white flex flex-col shadow-xl">
      
//       {/* Logo / Title */}
//       <div className="p-5 text-2xl font-bold border-b border-purple-700">
//         SocietyGate
//       </div>

//       {/* Menu Items */}
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

//       {/* Logout Button */}
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


// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FiHome, FiUsers, FiShield, FiTool, 
  FiLogOut, FiEye, FiClock 
} from "react-icons/fi";

const Sidebar = ({ role, onLogout }) => {
  const location = useLocation();

  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/admin", icon: <FiHome /> },
      { name: "Residents", path: "/admin/residents", icon: <FiUsers /> },
      { name: "Guards", path: "/admin/guards", icon: <FiShield /> },
      { name: "Staff", path: "/admin/staff", icon: <FiTool /> },
      { name: "Visitors", path: "/admin/visitors", icon: <FiEye /> },
      { name: "Guard Attendance", path: "/admin/attendance", icon: <FiClock /> },
    ],
    resident: [
      { name: "Dashboard", path: "/resident", icon: <FiHome /> },
      { name: "Visitors", path: "/resident/visitors", icon: <FiUsers /> },
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
    <div className="w-64 h-screen bg-gradient-to-b from-purple-900 via-purple-500 to-purple-300 text-white flex flex-col shadow-xl">
      
      {/* Logo / Title */}
      <div className="p-5 text-2xl font-bold border-b border-purple-700">
        SocietyGate
      </div>

      {/* Menu Items */}
      <ul className="flex-1 p-4 space-y-2">
        {menuItems[role]?.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
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

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="m-4 p-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
