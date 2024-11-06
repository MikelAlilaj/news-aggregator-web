import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { router } from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <LoadingProvider>
            <RouterProvider router={router} />
            <ToastContainer /> 
        </LoadingProvider>
    );
}

export default App;
