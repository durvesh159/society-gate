/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import App from './App';
// import './index.css';
// import { AuthProvider, AuthContext } from './contexts/AuthContext';

// import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

// // Dashboards
// import AdminDashboard from './pages/admin/AdminDashboard';
// import GuardDashboard from './pages/guard/GuardDashboard';
// import ResidentDashboard from './pages/resident/ResidentDashboard';
// import StaffDashboard from './pages/staff/StaffDashboard';

// // Visitors
// import GuardVisitors from "./pages/guard/GuardVisitors";
// import ResidentVisitors from "./pages/resident/ResidentVisitors";

// // Admin management pages
// import Residents from './pages/admin/Residents';
// import Visitors from './pages/admin/Visitors';
// import Guards from './pages/admin/Guards';
// import Staff from './pages/admin/Staff';

// // Attendance Pages
// import GuardAttendance from "./pages/guard/GuardAttendance";
// import AdminGuardAttendance from "./pages/admin/GuardAttendance";

// // Staff attendance pages
// import GuardStaffAttendance from "./pages/guard/StaffAttendance";
// import StaffAttendance from "./pages/staff/StaffAttendance";

// import Flats from "./pages/Flats";
// //import AddFlat from "./pages/AddFlat";

// const Protected = ({ children, role, user }) => {
//   if (!user) return <Navigate to="/login" />;
//   if (role && user.role !== role) return <Navigate to="/login" />;
//   return children;
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />

//           {/* ========================= ADMIN ROUTES ========================= */}
//           <Route
//             path="/admin"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="admin" user={user}>
//                     <AdminDashboard />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           <Route
//             path="/admin/residents"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="admin" user={user}>
//                     <Residents />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           <Route
//             path="/admin/visitors"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="admin" user={user}>
//                     <Visitors />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           <Route
//             path="/admin/guards"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="admin" user={user}>
//                     <Guards />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           <Route
//             path="/admin/staff"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="admin" user={user}>
//                     <Staff />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* ADMIN ATTENDANCE */}
//           <Route
//             path="/admin/attendance"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="admin" user={user}>
//                     <AdminGuardAttendance />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* ========================= GUARD ROUTES ========================= */}
//           <Route
//             path="/guard"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="guard" user={user}>
//                     <GuardDashboard />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           <Route
//             path="/guard/visitors"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="guard" user={user}>
//                     <GuardVisitors />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           <Route
//             path="/guard/attendance"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="guard" user={user}>
//                     <GuardAttendance />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* GUARD: STAFF ATTENDANCE */}
//           <Route
//             path="/guard/staff-attendance"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="guard" user={user}>
//                     <GuardStaffAttendance />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* ========================= RESIDENT ROUTES ========================= */}
//           <Route
//             path="/resident"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="resident" user={user}>
//                     <ResidentDashboard />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           <Route
//             path="/resident/visitors"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="resident" user={user}>
//                     <ResidentVisitors />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* ========================= STAFF ROUTES ========================= */}
//           <Route
//             path="/staff"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="staff" user={user}>
//                     <StaffDashboard />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* STAFF: Attendance */}
//           <Route
//             path="/staff/attendance"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected role="staff" user={user}>
//                     <StaffAttendance />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           <Route
//   path="/rent"
//   element={
//     <AuthContext.Consumer>
//       {({ user }) => (
//         <Protected user={user}>
//           {(user.role === "admin" || user.role === "resident") ? (
//             <Flats />
//           ) : (
//             <Navigate to="/login" />
//           )}
//         </Protected>
//       )}
//     </AuthContext.Consumer>
//   }
// />





//           {/* ❌ REMOVED NEWS ROUTES */}
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   </React.StrictMode>
// );




import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Dashboards
import AdminDashboard from './pages/admin/AdminDashboard';
import GuardDashboard from './pages/guard/GuardDashboard';
import ResidentDashboard from './pages/resident/ResidentDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';

// Visitors
import GuardVisitors from "./pages/guard/GuardVisitors";
import ResidentVisitors from "./pages/resident/ResidentVisitors";

// Admin management pages
import Residents from './pages/admin/Residents';
import Visitors from './pages/admin/Visitors';
import Guards from './pages/admin/Guards';
import Staff from './pages/admin/Staff';

// Attendance Pages
import GuardAttendance from "./pages/guard/GuardAttendance";
import AdminGuardAttendance from "./pages/admin/GuardAttendance";

// Staff attendance pages
import GuardStaffAttendance from "./pages/guard/StaffAttendance";
import StaffAttendance from "./pages/staff/StaffAttendance";

import Flats from "./pages/Flats";

// ================= PAYMENT MODULE PAGES =================
import PaymentDashboard from "./pages/payments/PaymentDashboard";
import ResidentPayments from "./pages/payments/ResidentPayments";
import AdminPayments from "./pages/payments/AdminPayments";
import PaymentMethods from "./pages/payments/PaymentMethods";
import PaymentSuccess from "./pages/payments/PaymentSuccess";

const Protected = ({ children, role, user }) => {
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* ========================= ADMIN ROUTES ========================= */}
          <Route
            path="/admin"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="admin" user={user}>
                    <AdminDashboard />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          <Route
            path="/admin/residents"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="admin" user={user}>
                    <Residents />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          <Route
            path="/admin/visitors"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="admin" user={user}>
                    <Visitors />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          <Route
            path="/admin/guards"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="admin" user={user}>
                    <Guards />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          <Route
            path="/admin/staff"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="admin" user={user}>
                    <Staff />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* ADMIN ATTENDANCE */}
          <Route
            path="/admin/attendance"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="admin" user={user}>
                    <AdminGuardAttendance />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* ========================= PAYMENT MODULE ROUTES ========================= */}
          
          {/* PAYMENT DASHBOARD (Admin & Resident) */}
          <Route
            path="/payments"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected user={user}>
                    {(user.role === "admin" || user.role === "resident") ? (
                      <PaymentDashboard />
                    ) : (
                      <Navigate to="/login" />
                    )}
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* RESIDENT PAYMENT PAGE */}
          <Route
            path="/payments/resident"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="resident" user={user}>
                    <ResidentPayments />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* ADMIN PAYMENT MANAGEMENT */}
          <Route
            path="/payments/admin"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="admin" user={user}>
                    <AdminPayments />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* PAYMENT METHODS (Both) */}
          <Route
            path="/payments/methods"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected user={user}>
                    {(user.role === "admin" || user.role === "resident") ? (
                      <PaymentMethods />
                    ) : (
                      <Navigate to="/login" />
                    )}
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* SUCCESS PAGE */}
          <Route path="/payments/success" element={<PaymentSuccess />} />

          {/* ========================= GUARD ROUTES ========================= */}
          <Route
            path="/guard"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="guard" user={user}>
                    <GuardDashboard />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          <Route
            path="/guard/visitors"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="guard" user={user}>
                    <GuardVisitors />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          <Route
            path="/guard/attendance"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="guard" user={user}>
                    <GuardAttendance />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* GUARD: STAFF ATTENDANCE */}
          <Route
            path="/guard/staff-attendance"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="guard" user={user}>
                    <GuardStaffAttendance />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* ========================= RESIDENT ROUTES ========================= */}
          <Route
            path="/resident"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="resident" user={user}>
                    <ResidentDashboard />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          <Route
            path="/resident/visitors"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="resident" user={user}>
                    <ResidentVisitors />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* ========================= STAFF ROUTES ========================= */}
          <Route
            path="/staff"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="staff" user={user}>
                    <StaffDashboard />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          <Route
            path="/staff/attendance"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected role="staff" user={user}>
                    <StaffAttendance />
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

          {/* Rent Flats */}
          <Route
            path="/rent"
            element={
              <AuthContext.Consumer>
                {({ user }) => (
                  <Protected user={user}>
                    {(user.role === "admin" || user.role === "resident") ? (
                      <Flats />
                    ) : (
                      <Navigate to="/login" />
                    )}
                  </Protected>
                )}
              </AuthContext.Consumer>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
