import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Verifique se o token existe

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoutes;