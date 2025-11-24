// import React, { useEffect, useState, useContext } from "react";
// import API from "../../api/api";
// import { AuthContext } from "../../contexts/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";

// export default function StaffAttendance() {
//   const { user, logout } = useContext(AuthContext);
//   const [history, setHistory] = useState([]);

//   const loadHistory = async () => {
//     try {
//       const res = await API.get(`/staff/attendance/${user.id}`);
//       setHistory(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { loadHistory(); }, []);

//   return (
//     <DashboardLayout role="staff" onLogout={logout}>
//       <div className="p-8 min-h-screen bg-gray-100">

//         <h1 className="text-3xl font-bold text-purple-900 mb-6">My Attendance</h1>

//         <div className="bg-white shadow-lg rounded-xl p-6 border border-purple-200">
//           <table className="w-full table-auto">
//             <thead className="bg-purple-200 text-purple-900">
//               <tr>
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Entry Time</th>
//                 <th className="p-2">Exit Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((record) => (
//                 <tr key={record._id} className="border-b text-center">
//                   <td className="p-2">{new Date(record.createdAt).toLocaleDateString()}</td>
//                   <td className="p-2">
//                     {record.entryTime ? new Date(record.entryTime).toLocaleTimeString() : "--"}
//                   </td>
//                   <td className="p-2">
//                     {record.exitTime ? new Date(record.exitTime).toLocaleTimeString() : "--"}
//                   </td>
//                 </tr>
//               ))}

//               {history.length === 0 && (
//                 <tr>
//                   <td colSpan={3} className="p-4 text-gray-500">
//                     No attendance records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </DashboardLayout>
//   );
// }


import React, { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";

export default function StaffAttendance() {
  const { user, logout } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await API.get(`/staff/attendance/${user.id}`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadHistory(); }, []);

  return (
    <DashboardLayout role="staff" onLogout={logout}>
      <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-100">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-6">
          My Attendance
        </h1>

        {/* TABLE WRAPPER WITH HORIZONTAL SCROLL FOR SMALL SCREENS */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-purple-200 overflow-x-auto">

          <table className="w-full table-auto min-w-[600px]">
            <thead className="bg-purple-200 text-purple-900 text-sm sm:text-base">
              <tr>
                <th className="p-2 sm:p-3">Date</th>
                <th className="p-2 sm:p-3">Entry Time</th>
                <th className="p-2 sm:p-3">Exit Time</th>
              </tr>
            </thead>

            <tbody>
              {history.map((record) => (
                <tr key={record._id} className="border-b text-center text-sm sm:text-base">
                  <td className="p-2 sm:p-3">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 sm:p-3">
                    {record.entryTime
                      ? new Date(record.entryTime).toLocaleTimeString()
                      : "--"}
                  </td>
                  <td className="p-2 sm:p-3">
                    {record.exitTime
                      ? new Date(record.exitTime).toLocaleTimeString()
                      : "--"}
                  </td>
                </tr>
              ))}

              {history.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="p-4 text-gray-500 text-sm sm:text-base text-center"
                  >
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}
