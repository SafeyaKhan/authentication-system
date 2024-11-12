// PrivateRoute.js

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth); // Check if user is logged in

  return user ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
