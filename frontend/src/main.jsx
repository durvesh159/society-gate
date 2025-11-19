/* eslint-disable react-refresh/only-export-components */
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import App from './App'
// import './index.css'
// import { AuthProvider, AuthContext } from './contexts/AuthContext'
// import Login from './pages/Login'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import GuardDashboard from './pages/GuardDashboard'
// import ResidentDashboard from './pages/ResidentDashboard'
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import StaffDashboard from './pages/staff/StaffDashboard'

// const Protected = ({ children, role, user }) => {
//   const u = user;
//   if(!u) return <Navigate to="/login" />
//   if(role && u.role !== role) return <Navigate to="/login" />
//   return children;
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/admin" element={<AuthContext.Consumer>{({user})=>(
//             <Protected user={user} role="admin"><AdminDashboard /></Protected>
//           )}</AuthContext.Consumer>} />
//           <Route path="/guard" element={<AuthContext.Consumer>{({user})=>(
//             <Protected user={user} role="guard"><GuardDashboard /></Protected>
//           )}</AuthContext.Consumer>} />
//           <Route path="/resident" element={<AuthContext.Consumer>{({user})=>(
//             <Protected user={user} role="resident"><ResidentDashboard /></Protected>
//           )}</AuthContext.Consumer>} />
//           <Route path="/staff" element={<AuthContext.Consumer>{({user})=>(
//             <Protected user={user} role="staff"><StaffDashboard /></Protected>
//           )}</AuthContext.Consumer>} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   </React.StrictMode>
// )


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import App from './App';
// import './index.css';
// import { AuthProvider, AuthContext } from './contexts/AuthContext';
// import Login from './pages/Login';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import GuardDashboard from './pages/guard/GuardDashboard';
// import ResidentDashboard from './pages/resident/ResidentDashboard';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import StaffDashboard from './pages/staff/StaffDashboard';

// const Protected = ({ children, role, user }) => {
//   const u = user;
//   if (!u) return <Navigate to="/login" />;
//   if (role && u.role !== role) return <Navigate to="/login" />;
//   return children;
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />

//           {/* Admin */}
//           <Route
//             path="/admin"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected user={user} role="admin">
//                     <AdminDashboard />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* Guard */}
//           <Route
//             path="/guard"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected user={user} role="guard">
//                     <GuardDashboard />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* Resident */}
//           <Route
//             path="/resident"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected user={user} role="resident">
//                     <ResidentDashboard />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />

//           {/* Staff */}
//           <Route
//             path="/staff"
//             element={
//               <AuthContext.Consumer>
//                 {({ user }) => (
//                   <Protected user={user} role="staff">
//                     <StaffDashboard />
//                   </Protected>
//                 )}
//               </AuthContext.Consumer>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   </React.StrictMode>
// );



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import App from './App';
// import './index.css';
// import { AuthProvider, AuthContext } from './contexts/AuthContext';
// import GuardVisitors from "./pages/guard/GuardVisitors";


// import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

// // Dashboards
// import AdminDashboard from './pages/admin/AdminDashboard';
// import GuardDashboard from './pages/guard/GuardDashboard';
// import ResidentDashboard from './pages/resident/ResidentDashboard';
// import StaffDashboard from './pages/staff/StaffDashboard';
// import ResidentVisitors from "./pages/resident/ResidentVisitors";


// // Admin Sub Pages
// import Residents from './pages/admin/Residents';
// import Visitors from './pages/admin/Visitors';
// import Guards from './pages/admin/Guards';
// import Staff from './pages/admin/Staff';

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

//           {/* ADMIN ROUTES */}
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

//           {/* Admin Sub Routes */}
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

//           {/* GUARD */}
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
//   path="/guard/visitors"
//   element={
//     <AuthContext.Consumer>
//       {({ user }) => (
//         <Protected role="guard" user={user}>
//           <GuardVisitors />
//         </Protected>
//       )}
//     </AuthContext.Consumer>
//   }
// />


//           {/* RESIDENT */}
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
//   path="/resident/visitors"
//   element={
//     <AuthContext.Consumer>
//       {({ user }) => (
//         <Protected role="resident" user={user}>
//           <ResidentVisitors />
//         </Protected>
//       )}
//     </AuthContext.Consumer>
//   }
// />


//           {/* STAFF */}
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

import RentList from "./pages/rent/RentList";

// ❌ REMOVED (no longer needed)
// import NewsList from "./pages/NewsList";
// import AddNews from "./pages/admin/AddNews";


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

          {/* STAFF: Attendance */}
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

          <Route path="/rent" element={
  <AuthContext.Consumer>
    {({ user }) => (
      <Protected user={user}>
        <RentList />
      </Protected>
    )}
  </AuthContext.Consumer>
} />


          {/* ❌ REMOVED NEWS ROUTES */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

