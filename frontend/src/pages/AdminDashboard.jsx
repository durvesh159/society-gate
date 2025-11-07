
// import React, { useState, useEffect, useContext } from 'react'
// import API from '../api/api'
// import { AuthContext } from '../contexts/AuthContext'

// export default function AdminDashboard(){
//   const [_residents, _setResidents] = useState([]);
//   const [_guards, _setGuards] = useState([]);
//   const [visitors, setVisitors] = useState([]);
//   const { logout } = useContext(AuthContext);

//   const fetchVisitors = async () => {
//     const res = await API.get('/admin/visitors');
//     setVisitors(res.data);
//   }

//   useEffect(()=>{ fetchVisitors() }, []);

//   const addResident = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payload = {
//       name: form.name.value, wing: form.wing.value, flatNo: form.flatNo.value,
//       email: form.email.value, password: form.password.value, mobile: form.mobile.value
//     };
//     await API.post('/admin/resident', payload);
//     alert('Resident added');
//     form.reset();
//   }

//   const addGuard = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payload = {
//       name: form.name.value, address: form.address.value,
//       email: form.email.value, password: form.password.value, mobile: form.mobile.value
//     };
//     await API.post('/admin/guard', payload);
//     alert('Guard added');
//     form.reset();
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-xl font-bold">Admin Dashboard</h1>
//         <button onClick={logout} className="text-sm text-red-500">Logout</button>
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Add Resident</h2>
//           <form onSubmit={addResident}>
//             <input name="name" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
//             <input name="wing" placeholder="Wing" className="w-full mb-2 p-2 border rounded" />
//             <input name="flatNo" placeholder="Flat No" className="w-full mb-2 p-2 border rounded" />
//             <input name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
//             <input name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
//             <input name="mobile" placeholder="Mobile" className="w-full mb-2 p-2 border rounded" />
//             <button className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
//           </form>
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Add Guard</h2>
//           <form onSubmit={addGuard}>
//             <input name="name" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
//             <input name="address" placeholder="Address" className="w-full mb-2 p-2 border rounded" />
//             <input name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
//             <input name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
//             <input name="mobile" placeholder="Mobile" className="w-full mb-2 p-2 border rounded" />
//             <button className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
//           </form>
//         </div>
//       </div>

//       <div className="mt-6 bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-2">Visitor Logs</h2>
//         <div className="overflow-auto">
//           <table className="w-full">
//             <thead><tr><th>Name</th><th>Flat</th><th>Purpose</th><th>Entry</th><th>Exit</th><th>Guard</th></tr></thead>
//             <tbody>
//               {visitors.map(v=>(
//                 <tr key={v._id}>
//                   <td>{v.name}</td>
//                   <td>{v.flatVisited}</td>
//                   <td>{v.purpose}</td>
//                   <td>{v.entryTime ? new Date(v.entryTime).toLocaleString() : '--'}</td>
//                   <td>{v.exitTime ? new Date(v.exitTime).toLocaleString() : '--'}</td>
//                   <td>{v.guard?.name || '--'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }



import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const [_residents, _setResidents] = useState([]);
  const [_guards, _setGuards] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const { logout } = useContext(AuthContext);

  // initialize socket
  useEffect(() => {
    const socket = io('http://localhost:5000'); // backend socket server

    // listen for visitor updates
    socket.on('visitorUpdate', (data) => {
      console.log('📡 Visitor update received (Admin):', data);
      fetchVisitors(); // refresh visitors data in real-time
    });

    return () => socket.disconnect();
  }, []);

  // Fetch all visitors
  const fetchVisitors = async () => {
    try {
      const res = await API.get('/admin/visitors');
      setVisitors(res.data);
    } catch (err) {
      console.error('Error fetching visitors:', err);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // Add Resident
  const addResident = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.name.value,
      wing: form.wing.value,
      flatNo: form.flatNo.value,
      email: form.email.value,
      password: form.password.value,
      mobile: form.mobile.value,
    };

    try {
      await API.post('/admin/resident', payload);
      alert('Resident added successfully');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Error adding resident');
    }
  };

  // Add Guard
  const addGuard = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.name.value,
      address: form.address.value,
      email: form.email.value,
      password: form.password.value,
      mobile: form.mobile.value,
    };

    try {
      await API.post('/admin/guard', payload);
      alert('Guard added successfully');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Error adding guard');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="text-sm text-red-500">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Add Resident */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Add Resident</h2>
          <form onSubmit={addResident}>
            <input name="name" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
            <input name="wing" placeholder="Wing" className="w-full mb-2 p-2 border rounded" />
            <input name="flatNo" placeholder="Flat No" className="w-full mb-2 p-2 border rounded" />
            <input name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
            <input name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
            <input name="mobile" placeholder="Mobile" className="w-full mb-2 p-2 border rounded" />
            <button className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
          </form>
        </div>

        {/* Add Guard */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Add Guard</h2>
          <form onSubmit={addGuard}>
            <input name="name" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
            <input name="address" placeholder="Address" className="w-full mb-2 p-2 border rounded" />
            <input name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
            <input name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
            <input name="mobile" placeholder="Mobile" className="w-full mb-2 p-2 border rounded" />
            <button className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
          </form>
        </div>
      </div>

      {/* Visitors Section */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Visitor Logs (Live)</h2>
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Flat</th>
                <th>Purpose</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Guard</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length > 0 ? (
                visitors.map((v) => (
                  <tr key={v._id} className="border-t">
                    <td>{v.name}</td>
                    <td>{v.flatVisited}</td>
                    <td>{v.purpose}</td>
                    <td>{v.entryTime ? new Date(v.entryTime).toLocaleString() : '--'}</td>
                    <td>{v.exitTime ? new Date(v.exitTime).toLocaleString() : '--'}</td>
                    <td>{v.guard?.name || '--'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No visitors yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
