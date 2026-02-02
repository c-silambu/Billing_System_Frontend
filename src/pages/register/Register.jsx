import { useState } from "react";
import API from "../../services/axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        username,
        password,
        role,
      });

      alert("Register success, please login");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-left-content">
          <h1>Create Account</h1>
          <p>
            Register to manage billing, invoices, and access the dashboard.
          </p>
        </div>
      </div>

      <div className="register-right">
        <form className="register-card" onSubmit={handleRegister}>
          <h2 className="register-title">Register</h2>
          <p className="register-subtitle">Fill in your details</p>

          <div className="input-group">
            <label>Username</label>
            <input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
