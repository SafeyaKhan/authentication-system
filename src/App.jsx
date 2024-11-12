// src/App.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./features/auth/authSlice"; // If you have an action to fetch user data on token
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import PostsPage from "./components/PostsPage";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/postspage" element={<PostsPage />} /> */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/postspage"
          element={
            <PrivateRoute>
              <PostsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
