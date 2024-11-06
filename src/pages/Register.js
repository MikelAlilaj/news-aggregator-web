import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AuthService from '../services/AuthService';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();  

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);  

        if (password !== passwordConfirmation) {
            setError("Passwords do not match.");
            return;
        }

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
            await AuthService.register({ name, email, password, password_confirmation: passwordConfirmation });
            navigate('/user-preferences');
        } catch (err) {
            const emailError = err.response?.data?.errors?.email?.[0];
            setError(emailError || 'Registration failed. Please try again.');
        }
    };

    return (
      <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light pt-5">
            <div className="card shadow-lg" style={styles.card}>
                <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4">Join the Community!</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="passwordConfirmation">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordConfirmation"
                                placeholder="Confirm your password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                    <div className="mt-3 text-center">
                        <p>Already have an account? <a href="/login" className="text-primary fw-bold">Login here</a></p>
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

export default Register;
