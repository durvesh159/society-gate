// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import API from '../api/api';

// export default function ResetPassword(){
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token');
//   const email = searchParams.get('email');
//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [msg, setMsg] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if(!token || !email) setMsg('Invalid reset link');
//   }, [token, email]);

//   const submit = async (e) => {
//     e.preventDefault();
//     if(password.length < 6) return setMsg('Password must be at least 6 chars');
//     if(password !== confirm) return setMsg('Passwords do not match');

//     try {
//       const res = await API.post('/password/reset', { email, token, newPassword: password });
//       setMsg(res.data.msg || 'Password reset OK');
//       setTimeout(()=>navigate('/login'), 1500);
//     } catch (err) {
//       setMsg(err.response?.data?.msg || 'Reset failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-md">
//         <h2 className="text-2xl mb-4">Reset Password</h2>
//         <input type="password" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" />
//         <input type="password" placeholder="Confirm password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="w-full mb-3 p-2 border rounded" />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Set Password</button>
//         {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
//       </form>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import API from "../api/api";

// export default function ResetPassword() {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");
//   const email = searchParams.get("email");

//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [msg, setMsg] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token || !email) setMsg("Invalid reset link");
//   }, [token, email]);

//   const submit = async (e) => {
//     e.preventDefault();
//     if (password.length < 6) return setMsg("Password must be at least 6 characters");
//     if (password !== confirm) return setMsg("Passwords do not match");

//     try {
//       const res = await API.post("/password/reset", {
//         email,
//         token,
//         newPassword: password,
//       });
//       setMsg(res.data.msg || "Password reset successful");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       setMsg(err.response?.data?.msg || "Reset failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-900 to-blue-700 px-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-semibold text-center mb-6 text-blue-900">
//           Reset Password
//         </h2>

//         <form onSubmit={submit} className="space-y-4">
//           <input
//             type="password"
//             placeholder="New password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-700 outline-none"
//           />

//           <input
//             type="password"
//             placeholder="Confirm password"
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-700 outline-none"
//           />

//           <button className="w-full bg-blue-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-900 transition">
//             Set Password
//           </button>

//           {msg && (
//             <p className="mt-3 text-sm text-gray-700 text-center">
//               {msg}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !email) setMsg("Invalid reset link");
  }, [token, email]);

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return setMsg("Password must be at least 6 characters");
    if (password !== confirm) return setMsg("Passwords do not match");

    try {
      const res = await API.post("/password/reset", {
        email,
        token,
        newPassword: password,
      });
      setMsg(res.data.msg || "Password reset successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-500 to-purple-300 px-4">
      <div className="backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-purple-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">
          Reset Password
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-700 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-700 outline-none"
          />

          <button className="w-full bg-purple-700 text-white py-3 rounded-lg text-lg font-medium hover:bg-purple-800 transition">
            Set Password
          </button>

          {msg && (
            <p className="mt-3 text-sm text-gray-700 text-center">
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
