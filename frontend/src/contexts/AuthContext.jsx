/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// import React, { createContext, useState, useEffect } from 'react';
// import API, { setAuthToken } from '../api/api';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const raw = localStorage.getItem('sg_user');
//     return raw ? JSON.parse(raw) : null;
//   });

//   useEffect(() => {
//     if(user?.token) setAuthToken(user.token);
//   }, [user]);

//   const login = async (email, password) => {
//     const res = await API.post('/auth/login', { email, password });
//     const token = res.data.token;
//     const payload = res.data.user;
//     const store = { token, role: payload.role, email };
//     localStorage.setItem('sg_user', JSON.stringify(store));
//     setAuthToken(token);
//     setUser(store);
//     return store;
//   }

//   const logout = () => {
//     localStorage.removeItem('sg_user');
//     setAuthToken(null);
//     setUser(null);
//   }

//   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
// }


// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import API, { setAuthToken } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('sg_user');
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      // support legacy shapes: if parsed.token missing, but parsed has 'token' under another key, normalize
      return parsed;
    } catch (e) {
        console.log(e);
      return null;
    }
  });

  // whenever app starts or user changes, set axios header
  useEffect(() => {
    if (user && user.token) {
      setAuthToken(user.token);
    } else {
      setAuthToken(null);
    }
  }, [user]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    const token = res.data.token;
    const payload = res.data.user || {};
    // normalized store: keep token, role, email, id
    const store = {
      token,
      role: payload.role,
      email: payload.email || email,
      id: payload.id || payload._id
    };
    localStorage.setItem('sg_user', JSON.stringify(store));
    setAuthToken(token);
    setUser(store);
    return store;
  };

  const logout = () => {
    localStorage.removeItem('sg_user');
    setAuthToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
