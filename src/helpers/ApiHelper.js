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


//For Users
export const getUsers = async() => {
  try{
    const response = await apiClient.get('/users/');
    return response.data;
  } catch (error) {
    throw error.response?.data || {error: "Failed to get users!"};
  }
};

export const postUsers = async(userdata) => {
  try{
    const response = await apiClient.post('/users/', userdata)
    return response.data;
  } catch (error) {
    throw error.response?.data || {error: "Failed to post users!"};
  }
};

export const putUsers = async (id, update_user) => {
  try{
    const response = await apiClient.put(`/users/${id}/`, update_user);
    return response.data;
  } catch(error){
    throw error.response?.data || {error : "Failed to put users!"};
  }
};

export const deleteUsers = async (id) => {
  try{
    const response = await apiClient.delete(`/users/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || {error: "Failed to delete users!"};
  }
};


//read the plan data(getPlans)
export const getPlans = async() =>{
  try{
    const res =await apiClient.get(`/plans/`);
    return res.data;
  }catch(err){
    throw err.res?.data ||{err:'Failed to get  Plan Data'};
  }
};

//add plan data()
export const postPlan = async(planData) =>{
  try{
    const res = await apiClient.post('/plans/', planData);
    return res.data;
  }catch(err){
    throw err.res?.data ||{err:'Failed to get Plan Data'};
  }
};
//update plan data
export const updatePlan = async (id, updatePlanData) =>{
  try{
    const res = await apiClient.put(`/plans/${id}/`,updatePlanData);
    return res.data;
  }catch(err){
    throw err.res?.data ||{err:"Failed to update"}
  }
};

//delete plan data
export const deletePlan = async (id) => {
  try{
    const res =   await apiClient.delete(`/plans/${id}/`);
    return res.data;
  }catch(err){
    throw err.res?.data ||{err:"Failed to Delete Plan Data"};
  }
};

//for groups(roles)
export const getGroups = async (id) => {
  try{
    const response = await apiClient.get('/roles/');
    return response.data;
  } catch (error) {
      throw error?.response.data || {error: "Failed to get groups!"};
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

