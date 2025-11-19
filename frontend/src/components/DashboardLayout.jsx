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
import NewsModal from "./NewsModal";
import socket from "../socket";

const DashboardLayout = ({ children, role, onLogout }) => {
  const [showNews, setShowNews] = React.useState(false);
  const [hasNewNews, setHasNewNews] = React.useState(false);

  React.useEffect(() => {
    // When server broadcasts a new news, show badge
    socket.on("newsCreated", () => {
      setHasNewNews(true);
    });

    // If update or delete occured, mark badge as new (so user notices)
    socket.on("newsUpdated", () => setHasNewNews(true));
    socket.on("newsDeleted", () => setHasNewNews(true));

    return () => {
      socket.off("newsCreated");
      socket.off("newsUpdated");
      socket.off("newsDeleted");
    };
  }, []);

  const openNews = () => {
    // opening clears badge locally (user is viewing)
    setHasNewNews(false);
    setShowNews(true);
  };

  return (
    <div className="flex h-screen  text-gray-900">
      <Sidebar role={role} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-auto">
        {/* TOP NAVBAR */}
        <header className="bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize">{role} Dashboard</h1>

          {/* NEWS BUTTON (Visible to all roles) */}
          <div className="relative">
            <button
              onClick={openNews}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
            >
              <span>News</span>
            </button>

            {/* Notification badge */}
            {hasNewNews && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 shadow-lg" />
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto ">{children}</main>
      </div>

      {/* News Modal */}
      {showNews && (
        <NewsModal
          role={role}
          onClose={() => setShowNews(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;

