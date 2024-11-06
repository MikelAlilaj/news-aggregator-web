import React from 'react';
import { Outlet, createBrowserRouter, useNavigation } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import PersonalizedNews from './pages/PersonalizedNews';
import UserPreferences from './pages/UserPreferences';
import AuthMiddleware from './middleware/AuthMiddleware';
import News from './pages/News';
import Login from './pages/Login';
import Register from './pages/Register';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { useLoading } from './context/LoadingContext';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthMiddleware><NavbarLayout /></AuthMiddleware>,
  
    children: [
      { path: "/", element:  <PersonalizedNews />  },
      { path: "news", element:  <News /> },
      { path: "user-preferences", element:  <UserPreferences /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

function NavbarLayout() {
  const { state } = useNavigation();
  const { loading } = useLoading();
  const isLoading = state === "loading" || loading;

  return (
    <>
      <NavigationBar />
      {isLoading && <LoadingSpinner />}  
      <Outlet />  
    </>
  );
}
