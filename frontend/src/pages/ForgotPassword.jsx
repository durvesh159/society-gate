// import React, { useState } from 'react';
// import API from '../api/api'; // or import axios and use baseURL

// export default function ForgotPassword(){
//   const [email, setEmail] = useState('');
//   const [msg, setMsg] = useState(null);

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/password/forgot', { email });
//       setMsg(res.data.msg || 'If that email exists, a reset link has been sent.');
//     } catch (err) {
//       setMsg(err.response?.data?.msg || 'Error sending reset email');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-md">
//         <h2 className="text-2xl mb-4">Forgot Password</h2>
//         <input type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Send Reset Link</button>
//         {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
//       </form>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import API from "../api/api";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [msg, setMsg] = useState(null);

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/password/forgot", { email });
//       setMsg(res.data.msg || "If that email exists, a reset link has been sent.");
//     } catch (err) {
//       setMsg(err.response?.data?.msg || "Error sending reset email");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-900 to-blue-700 px-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-semibold text-center mb-6 text-blue-900">
//           Forgot Password
//         </h2>

//         <form onSubmit={submit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-700 outline-none"
//           />

//           <button className="w-full bg-blue-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-900 transition">
//             Send Reset Link
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


import React, { useState } from "react";
import API from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/password/forgot", { email }, {
  headers: { Authorization: "" }
});

      setMsg(res.data.msg || "If that email exists, a reset link has been sent.");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error sending reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-500 to-purple-300 px-4">
      <div className="backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-purple-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">
          Forgot Password
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-700 outline-none"
          />

          <button className="w-full bg-purple-700 text-white py-3 rounded-lg text-lg font-medium hover:bg-purple-800 transition">
            Send Reset Link
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
