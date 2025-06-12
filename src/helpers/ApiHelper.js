import axios from 'axios';

// For Vite use import.meta.env, for CRA use process.env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions...


// GET all clients
export const getClients = async () => {
  try {
    const response = await apiClient.get('/clients/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch clients' };
  }
};

export const postClient = async (clientData) => {
  try {
    const response = await apiClient.post(`/clients/`,clientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch clients' };
  }
};
//updation
export const updateClient = async(id, updateData) => {
  try{
    const res = await apiClient.put(`/clients/${id}/`,updateData);
    return res.data;
  }catch(err){
   throw err.res?.data || { "Frontend Error":err };
  }
};
//deletion for selected clients
export const deleteClient = async(id) =>{
  try{
    const res = await apiClient.delete(`/clients/${id}/`);
    return res.data;
  }catch(err){
    throw err.res?.data || {"Frontend Error":err};
  }
};


// LOGIN (get JWT tokens)
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('auth/jwt/create/', credentials);
    return response.data;  // { access: "...", refresh: "..." }
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

// REFRESH TOKEN
export const refreshToken = async (refresh) => {
  try {
    const response = await apiClient.post('auth/jwt/refresh/', { refresh });
    return response.data; // { access: "..." }
  } catch (error) {
    throw error.response?.data || { error: 'Token refresh failed' };
  }
};

// GET CURRENT USER INFO
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('auth/users/me/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch user info' };
  }
};

// LOGOUT - typically frontend just clears tokens
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

