import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email,password);
      if(user.role === 'admin') navigate('/admin');
      else if(user.role === 'guard') navigate('/guard');
      else navigate('/resident');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded"/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        <p className="mt-2 text-sm">
  <a href="/forgot" className="text-blue-600">Forgot password?</a>
</p>

      </form>
    </div>
  )
}
