import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,  
    (error) => {
        
        toast.error("An unexpected error occurred. Please try again later.");
         
    }
);

export default apiClient;
