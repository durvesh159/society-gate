import React, { useState } from 'react';
import API from '../api/api'; // or import axios and use baseURL

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/password/forgot', { email });
      setMsg(res.data.msg || 'If that email exists, a reset link has been sent.');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error sending reset email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Forgot Password</h2>
        <input type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Send Reset Link</button>
        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </form>
    </div>
  );
}
