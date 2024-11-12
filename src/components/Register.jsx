// Register.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons
import "../App.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    const result = await dispatch(registerUser(userData));
    if (registerUser.fulfilled.match(result)) {
      navigate("/profile"); // Redirect to profile after registration
    }
  };
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
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Gender
              </span>
              <input
                type="text"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />{" "}
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />{" "}
              <span onClick={togglePasswordVisibility} className="toggle-icon">
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                First Name
              </span>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Last Name
              </span>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                User Name
              </span>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                class="btn btn-light"
                style={{ background: "#d6e0e2" }}
              >
                Register
              </button>
              <button
                type="button"
                class="btn btn-light"
                style={{ marginLeft: "5px", background: "#d6e0e2" }}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </form>
          {error && <p>{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
