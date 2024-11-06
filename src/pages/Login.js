import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import AuthService from '../services/AuthService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();  

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);  

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            await AuthService.login(email, password);
            navigate('/'); 
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light pt-5">
            <div className="card shadow-lg" style={styles.card}>
                <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4">Stay Informed, Stay Ahead!</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <div className="mt-3 text-center">
                        <p>Don't have an account? <a href="/register" className="text-primary fw-bold">Register here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        maxWidth: '400px',
        width: '100%',  
        borderRadius: '15px', 
    },
};

export default Login;
