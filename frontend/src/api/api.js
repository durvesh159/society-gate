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


export default API;
