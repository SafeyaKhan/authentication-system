// src/components/LogoutButton.js

import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear user state and remove token
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
