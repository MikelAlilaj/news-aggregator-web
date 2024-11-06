import axios from 'axios';

const authClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const TOKEN_KEY = 'token'; 
 
const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const login = async (email, password) => {
        const response = await authClient.post('/login', { email, password });
        const token = response.data.token;
        saveToken(token); 
        return response.data.user; 
   
};

const register = async (userData) => {
        const response = await authClient.post('/register', userData);
        const token = response.data.token;
        saveToken(token);
        return response.data; 
};

const logout = () => {
    removeToken(); 
};

const isAuthenticated = () => {
    return !!getToken(); 
};

export default { login, register, logout, isAuthenticated };