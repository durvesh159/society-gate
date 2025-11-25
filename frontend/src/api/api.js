// import axios from 'axios';

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://society-gate.onrender.com/api',
// });

// export const setAuthToken = (token) => {
//   if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   else delete API.defaults.headers.common['Authorization'];
// }

// export const addFlat = (data) => API.post("/flats/add", data);
// export const getFlats = () => API.get("/flats");
// export const markFeatured = (id) => API.put(`/flats/featured/${id}`);
// export const markAsRented = (id) => API.put(`/flats/rented/${id}`);


// export default API;


import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://society-gate.onrender.com/api',
});

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
}

export const addFlat = (data) => API.post("/flats/add", data);
export const getFlats = () => API.get("/flats");
export const markFeatured = (id) => API.put(`/flats/featured/${id}`);
export const markAsRented = (id) => API.put(`/flats/rented/${id}`);

const publicRoutes = ["/password/forgot", "/password/reset"];

API.interceptors.request.use((config) => {
  if (publicRoutes.includes(config.url)) {
    delete config.headers.Authorization;
  }
  return config;
});



export default API;
