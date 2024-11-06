import React from "react";
import "./LoadingSpinner.css"; 

const LoadingSpinner = () => (
    <div className="loading-overlay">
        <div className="spinner-border text-primary" role="status">
        </div>
    </div>
);

export default LoadingSpinner;
