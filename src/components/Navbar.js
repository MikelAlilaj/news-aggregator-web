import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const NavigationBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();  
        navigate("/login");  
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    News Aggregator
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">
                                News
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user-preferences">
                                Preferences
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">  
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
