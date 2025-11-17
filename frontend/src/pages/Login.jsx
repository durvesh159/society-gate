// import React, { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../contexts/AuthContext'

// export default function Login(){
//   const { login } = useContext(AuthContext);
//   const [email,setEmail]=useState('');
//   const [password,setPassword]=useState('');
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await login(email,password);
//       if(user.role === 'admin') navigate('/admin');
//       else if(user.role === 'guard') navigate('/guard');
//       else if(user.role === 'staff') navigate('/staff'); 
//       else navigate('/resident');
//     } catch (err) {
//       alert(err.response?.data?.msg || 'Login failed');
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-md">
//         <h2 className="text-2xl mb-4">Login</h2>
//         <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded"/>
//         <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded"/>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
//         <p className="mt-2 text-sm">
//   <a href="/forgot" className="text-blue-600">Forgot password?</a>
// </p>

//       </form>
//     </div>
//   )
// }



// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await login(email, password);
//       if (user.role === "admin") navigate("/admin");
//       else if (user.role === "guard") navigate("/guard");
//       else if (user.role === "staff") navigate("/staff");
//       else navigate("/resident");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-900 to-blue-700 px-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-semibold text-center mb-6 text-blue-900">
//           Welcome Back
//         </h2>

//         <form onSubmit={submit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-700 outline-none"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-700 outline-none"
//           />

//           <button className="w-full bg-blue-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-900 transition">
//             Login
//           </button>
//         </form>

//         <p className="mt-3 text-sm text-center">
//           <a href="/forgot" className="text-blue-700 font-medium hover:underline">
//             Forgot password?
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "guard") navigate("/guard");
      else if (user.role === "staff") navigate("/staff");
      else navigate("/resident");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-500 to-purple-300 px-4">
      <div className="backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-purple-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">
          Welcome Back
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-700 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-700 outline-none"
          />

          <button className="w-full bg-purple-700 text-white py-3 rounded-lg text-lg font-medium hover:bg-purple-800 transition">
            Login
          </button>
        </form>

        <p className="mt-3 text-sm text-center">
          <a href="/forgot" className="text-purple-700 font-medium hover:underline">
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  );
}
