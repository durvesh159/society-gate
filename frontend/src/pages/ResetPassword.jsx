import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function ResetPassword(){
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!token || !email) setMsg('Invalid reset link');
  }, [token, email]);

  const submit = async (e) => {
    e.preventDefault();
    if(password.length < 6) return setMsg('Password must be at least 6 chars');
    if(password !== confirm) return setMsg('Passwords do not match');

    try {
      const res = await API.post('/password/reset', { email, token, newPassword: password });
      setMsg(res.data.msg || 'Password reset OK');
      setTimeout(()=>navigate('/login'), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        <input type="password" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Confirm password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Set Password</button>
        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </form>
    </div>
  );
}
