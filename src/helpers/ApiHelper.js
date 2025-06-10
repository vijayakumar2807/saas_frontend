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


// export const handleSubmit = async (e,comp_name, contact_email, industry ) =>{
//         //e.preventDefault();//stops page refresh
//         const data = {
//             comp_name :comp_name,
//             contact_email : contact_email,
//             industry : industry
//           };
//           try {
//           const res = await axiosInstance.post('/clients/', data);
//           alert(`Name: ${comp_name}, Contact_Email: ${contact_email}, Industry: ${industry}`);
//           if (res.status === 200 || res.status === 201) {
//             alert('Submitted successfully!')
//             console.log(res.data)
//             //return res.data; // Return the response data
//           } else {
//             alert('Error submitting form.');
//             console.log('Error')
//             //return null; // Return null on error
//           }
//         } catch (error) {
//           console.error(error);
//           alert('Error Exception',error);
//           //return null; // Return null on error
//         }
        
//     };

























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

