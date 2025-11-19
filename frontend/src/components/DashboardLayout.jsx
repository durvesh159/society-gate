// // src/components/DashboardLayout.jsx
// import React from "react";
// import Sidebar from "./Sidebar";

// const DashboardLayout = ({ children, role, onLogout }) => {
//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-900">
//       <Sidebar role={role} onLogout={onLogout} />
//       <div className="flex-1 flex flex-col overflow-auto">
//         {/* <header className="bg-white shadow-md p-4 flex justify-between items-center">
//           <h1 className="text-xl font-semibold capitalize">
//             {role} Dashboard
//           </h1>
//         </header> */}
//         <main className="flex-1 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// src/components/DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children, role, onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <Sidebar role={role} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-auto">

        {/* ⭐ TOP NAVBAR */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

          <h1 className="text-xl font-semibold capitalize">
            {role} Dashboard
          </h1>

          {/* ⭐ NEWS BUTTON (Visible to all roles) */}
          <Link
            to="/news"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            News
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
