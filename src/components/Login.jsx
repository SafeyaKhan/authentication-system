// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons
import "../App.css";

const Login = () => {
  // const [formData, setFormData] = useState({ email: "", password: "" });
  const [email, setEmail] = useState(""); // Declare email state
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    const result = await dispatch(loginUser(userData));

    // Check if the login was successful
    console.log("Login result: ", result);

    if (loginUser.fulfilled.match(result)) {
      console.log("User is authenticated: Redirecting to profile page...");
      navigate("/profile"); // Redirect to profile page after successful login
    } else {
      console.log("Login failed.");
    }
  };

  useEffect(() => {
    console.log("Current user state:", user); // Check if user is updated
    if (user) {
      console.log("User is present. Redirecting to /profile");
      navigate("/profile"); // Redirect to profile page if user is already logged in
    }
  }, [user, navigate]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div
          className="card"
          style={{
            width: "380px",
            textAlign: "center",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontFamily: "sans-serif",
              marginBottom: "10px",
            }}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Email
              </span>
              <input
                type="email"
                value={email} // Controlled input for email
                onChange={(e) => setEmail(e.target.value)} // Update email state
                placeholder="Email"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span onClick={togglePasswordVisibility} className="toggle-icon">
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && <p>{error.message}</p>}
            <div style={{ marginTop: "5px" }}>
              <button
                type="submit"
                className="btn btn-light"
                disabled={loading}
                style={{ background: "#d6e0e2" }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                type="button"
                className="btn btn-light"
                style={{ marginLeft: "5px", background: "#d6e0e2" }}
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
