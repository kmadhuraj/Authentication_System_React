import axios from 'axios';
import { data } from 'react-router-dom';

const API = axios.create({ baseURL: 'https://localhost:7049/api/Auth' });

export const register = (data) => API.post('/', data);
export const login = (data) => API.post('/login', data);
export const forgotPassword = (data) => API.post('/forgot-password', data)
export const resetPassword = (data) => API.post('/reset-password', data)
export const userList=(data)=>API.get('/',data);