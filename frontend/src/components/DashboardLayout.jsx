// // src/components/DashboardLayout.jsx
// import React from "react";
// import Sidebar from "./Sidebar";
// import NewsModal from "./NewsModal";
// import socket from "../socket";
// import { FiBell } from "react-icons/fi";

// const DashboardLayout = ({ children, role, onLogout }) => {
//   const [showNews, setShowNews] = React.useState(false);
//   const [hasNewNews, setHasNewNews] = React.useState(false);

//   React.useEffect(() => {
//     socket.on("newsCreated", () => setHasNewNews(true));
//     socket.on("newsUpdated", () => setHasNewNews(true));
//     socket.on("newsDeleted", () => setHasNewNews(true));

//     return () => {
//       socket.off("newsCreated");
//       socket.off("newsUpdated");
//       socket.off("newsDeleted");
//     };
//   }, []);

//   const openNews = () => {
//     setHasNewNews(false);
//     setShowNews(true);
//   };

//   return (
//     <div className="flex h-screen text-gray-900">
//       <Sidebar role={role} onLogout={onLogout} />

//       <div className="flex-1 flex flex-col overflow-auto">

//         {/* ⭐ TOP NAVBAR - Perfectly Matching Theme */}
//         <header className="bg-gradient-to-br from-purple-200 via-blue-50 to-teal-50 backdrop-blur-xl shadow-lg border-b border-purple-200/40 px-6 py-4 flex justify-between items-center">

//           <h1 className="text-2xl font-bold text-purple-900 tracking-wide capitalize">
//             {role} Dashboard
//           </h1>

//           {/* ⭐ NEWS ICON BUTTON */}
//           <div className="relative">
//             <button
//               onClick={openNews}
//               className="p-3 bg-white/70 hover:bg-white/90 border border-purple-200 shadow-md rounded-xl transition-all flex items-center justify-center"
//             >
//               <FiBell className="text-purple-700" size={22} />
//             </button>

//             {/* 🔴 RED BADGE */}
//             {hasNewNews && (
//               <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-600 shadow-lg animate-pulse" />
//             )}
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto">{children}</main>
//       </div>

//       {/* ⭐ NEWS POPUP MODAL */}
//       {showNews && (
//         <NewsModal role={role} onClose={() => setShowNews(false)} />
//       )}
//     </div>
//   );
// };

// export default DashboardLayout;



// components/DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import NewsModal from "./NewsModal";
import socket from "../socket";
import { FiBell, FiMenu } from "react-icons/fi";

const DashboardLayout = ({ children, role, onLogout }) => {
  const [showNews, setShowNews] = React.useState(false);
  const [hasNewNews, setHasNewNews] = React.useState(false);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  React.useEffect(() => {
    socket.on("newsCreated", () => setHasNewNews(true));
    socket.on("newsUpdated", () => setHasNewNews(true));
    socket.on("newsDeleted", () => setHasNewNews(true));

    return () => {
      socket.off("newsCreated");
      socket.off("newsUpdated");
      socket.off("newsDeleted");
    };
  }, []);

  const openNews = () => {
    setHasNewNews(false);
    setShowNews(true);
  };

  return (
    <div className="flex h-screen text-gray-900">

      {/* SIDEBAR */}
      <Sidebar
        role={role}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-auto">

        {/* TOP NAV */}
        <header className="bg-gradient-to-br from-purple-200 via-blue-50 to-teal-50
          backdrop-blur-xl shadow-lg border-b border-purple-200/40
          px-6 py-4 flex justify-between items-center">

          {/* HAMBURGER (only mobile/tablet) */}
          <button
            className="lg:hidden text-purple-800 text-3xl mr-3"
            onClick={toggleSidebar}
          >
            <FiMenu />
          </button>

          <h1 className="text-2xl font-bold text-purple-900 tracking-wide capitalize">
            {role} Dashboard
          </h1>

          {/* NEWS ICON */}
          <div className="relative">
            <button
              onClick={openNews}
              className="p-3 bg-white/70 hover:bg-white/90 border border-purple-200 shadow-md rounded-xl transition-all flex items-center justify-center"
            >
              <FiBell className="text-purple-700" size={22} />
            </button>

            {hasNewNews && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-600 shadow-lg animate-pulse" />
            )}
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* NEWS MODAL */}
      {showNews && <NewsModal role={role} onClose={() => setShowNews(false)} />}
    </div>
  );
};

export default DashboardLayout;
