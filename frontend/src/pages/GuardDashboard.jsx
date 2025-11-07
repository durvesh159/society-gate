import React, { useEffect, useState, useContext } from 'react';
//import { io } from 'socket.io-client';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import socket from '../socket';


export default function GuardDashboard() {
  const { logout } = useContext(AuthContext);
  const [visitors, setVisitors] = useState([]);
  const [flat, setFlat] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [purpose, setPurpose] = useState('');
  const [verifyInput, setVerifyInput] = useState('');
  //const socket = io('http://localhost:5000', { transports: ['websocket'] });

  const fetchVisitors = async () => {
    try {
      const res = await API.get('/guard/visitors');
      setVisitors(res.data);
    } catch (err) {
      console.error('fetchVisitors error', err);
    }
  };

  useEffect(() => {
    fetchVisitors();
    socket.on('visitorUpdate', fetchVisitors);
    return () => {
        socket.off('visitorUpdate');
    };

  }, []);

  const addVisitor = async (e) => {
    e.preventDefault();
    await API.post('/guard/add-visitor', { name, mobile, purpose, flatVisited: flat, preapproved: false });
    setName('');
    setMobile('');
    setPurpose('');
    setFlat('');
    socket.emit('visitorUpdate');
    fetchVisitors();
  };

  const allow = async (id) => {
    await API.post('/guard/allow', { visitorId: id });
    socket.emit('visitorUpdate');
    fetchVisitors();
  };

  const checkout = async (id) => {
    await API.post('/guard/checkout', { visitorId: id });
    socket.emit('visitorUpdate');
    fetchVisitors();
  };

  const verifyPasscode = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/guard/verify-passcode', { passcode: verifyInput });
      alert(`Passcode valid. Visitor: ${res.data.name}`);
      setVerifyInput('');
      fetchVisitors();
    } catch {
      alert('Invalid or expired passcode.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Guard Dashboard</h1>
        <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
      </div>

      {/* Verify passcode */}
      <form onSubmit={verifyPasscode} className="mb-4 flex space-x-2">
        <input
          value={verifyInput}
          onChange={(e) => setVerifyInput(e.target.value)}
          placeholder="Enter visitor passcode"
          className="p-2 border rounded flex-1"
          required
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Verify</button>
      </form>

      {/* Add visitor form */}
      <form onSubmit={addVisitor} className="mb-4 flex flex-wrap gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Visitor name" className="p-2 border rounded" required />
        <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" className="p-2 border rounded" required />
        <input value={flat} onChange={(e) => setFlat(e.target.value)} placeholder="Flat" className="p-2 border rounded" required />
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="p-2 border rounded" required />
        <button className="bg-green-600 text-white px-3 py-1 rounded">Add Visitor</button>
      </form>

      {/* Visitor list */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Visitors</h2>
        {visitors.length === 0 ? (
          <div className="text-sm text-gray-500">No visitors yet.</div>
        ) : (
          visitors.filter(v => v.status !== 'checkedout').map(v => (
            <div key={v._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <div className="font-semibold">{v.name} — {v.flatVisited}</div>
                <div className="text-sm text-gray-600">{v.purpose} | Status: {v.status}</div>
              </div>
              <div className="space-x-2">
                <button onClick={() => allow(v._id)} className="px-2 py-1 bg-green-600 text-white rounded">Allow</button>
                <button onClick={() => checkout(v._id)} className="px-2 py-1 bg-gray-600 text-white rounded">Checkout</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
