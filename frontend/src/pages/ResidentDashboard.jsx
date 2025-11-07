// frontend/src/pages/ResidentDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
// import { io } from 'socket.io-client';
import socket from '../socket';


export default function ResidentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [datetime, setDatetime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

//   const socket = io('https://society-gate.onrender.com', { transports: ['websocket'] });

  const fetchPending = async () => {
    try {
      const res = await API.get('/resident/pending');
      setPending(res.data || []);
    } catch (err) {
      console.error('fetchPending', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await API.get('/resident/visitors');
      setHistory(res.data || []);
    } catch (err) {
      console.error('fetchHistory', err);
    }
  };

  useEffect(() => {
    fetchPending();
    fetchHistory();

    // 🔔 Listen for visitor updates from socket
    socket.on('visitorUpdate', () => {
      fetchPending();
      fetchHistory();
    });

    return () => {
        socket.off('visitorUpdate');
    };

  }, []);

  const preApprove = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/resident/preapprove', {
        name,
        mobile,
        email,
        purpose,
        scheduledTime: datetime || undefined,
      });
      setName('');
      setMobile('');
      setEmail('');
      setPurpose('');
      setDatetime('');
      alert('Pre-approved successfully. Visitor will receive an email.');
      fetchPending();
      fetchHistory();

      // Emit event to guards
      socket.emit('visitorUpdate');
    } catch (err) {
      console.error('preApprove error', err);
      alert(err.response?.data?.msg || 'Error pre-approving visitor');
    } finally {
      setLoading(false);
    }
  };

  const decideVisitor = async (visitorId, decision) => {
    try {
      await API.post('/resident/approve', { visitorId, decision });
      fetchPending();
      fetchHistory();

      socket.emit('visitorUpdate');
    } catch (err) {
      console.error('decideVisitor', err);
      alert(err.response?.data?.msg || 'Error processing decision');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Resident Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Logged in: {user?.email}</span>
          <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pre-approve form */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Pre-approve / Invite a Visitor</h2>
          <form onSubmit={preApprove}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Visitor name" className="mb-2 p-2 border rounded w-full" required />
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" className="mb-2 p-2 border rounded w-full" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Visitor email" className="mb-2 p-2 border rounded w-full" required />
            <label className="text-sm text-gray-700">Date & Time (optional)</label>
            <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="mb-2 p-2 border rounded w-full" />
            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="mb-2 p-2 border rounded w-full" />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded">
              {loading ? 'Submitting...' : 'Pre-approve'}
            </button>
          </form>
        </div>

        {/* Pending approvals */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Pending Visitors</h2>
          {pending.length === 0 ? (
            <div className="text-sm text-gray-500">No pending visitors.</div>
          ) : (
            pending.map((v) => (
              <div key={v._id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{v.name}</div>
                  <div className="text-sm text-gray-600">{v.purpose}</div>
                  <div className="text-xs text-gray-500">Status: {v.status}</div>
                </div>
                <div className="space-x-2">
                  <button onClick={() => decideVisitor(v._id, 'allow')} className="px-2 py-1 bg-green-600 text-white rounded">Allow</button>
                  <button onClick={() => decideVisitor(v._id, 'reject')} className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Visitor history */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Visitor History</h2>
        {history.length === 0 ? (
          <div className="text-sm text-gray-500">No visitor history yet.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="p-2">Name</th>
                <th className="p-2">Purpose</th>
                <th className="p-2">Status</th>
                <th className="p-2">Passcode</th>
              </tr>
            </thead>
            <tbody>
              {history.map((v) => (
                <tr key={v._id} className="border-t">
                  <td className="p-2">{v.name}</td>
                  <td className="p-2">{v.purpose}</td>
                  <td className="p-2">{v.status}</td>
                  <td className="p-2">{v.passcode || '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
