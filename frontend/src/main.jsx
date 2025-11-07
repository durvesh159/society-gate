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

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider, AuthContext } from './contexts/AuthContext'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import GuardDashboard from './pages/GuardDashboard'
import ResidentDashboard from './pages/ResidentDashboard'
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const Protected = ({ children, role, user }) => {
  const u = user;
  if(!u) return <Navigate to="/login" />
  if(role && u.role !== role) return <Navigate to="/login" />
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<AuthContext.Consumer>{({user})=>(
            <Protected user={user} role="admin"><AdminDashboard /></Protected>
          )}</AuthContext.Consumer>} />
          <Route path="/guard" element={<AuthContext.Consumer>{({user})=>(
            <Protected user={user} role="guard"><GuardDashboard /></Protected>
          )}</AuthContext.Consumer>} />
          <Route path="/resident" element={<AuthContext.Consumer>{({user})=>(
            <Protected user={user} role="resident"><ResidentDashboard /></Protected>
          )}</AuthContext.Consumer>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
