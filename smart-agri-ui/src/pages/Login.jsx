import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", res.data);

    if (res.data) {
      const user = res.data;

      // ✅ STORE LOGIN DATA
      localStorage.setItem("farmerName", user.fullName);
      localStorage.setItem("farmerId", user.id);
      localStorage.setItem("role", user.role);

      // ✅ ROLE BASED REDIRECT
      if (user.role === "farmer") navigate("/farmer/dashboard");
      if (user.role === "admin") navigate("/admin/dashboard");
      if (user.role === "expert") navigate("/expert/dashboard");
    } else {
      setError("Invalid email or password!");
    }
  } catch (err) {
    setError("Invalid email or password!");
  }
};
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/farming-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
        }}
      >
        {/* Header */}
        <div
          className="text-white text-center p-3 mb-3"
          style={{ backgroundColor: "#2e7d32", borderRadius: "6px" }}
        >
          <h3 className="mb-0">🌱 Smart Agri Help</h3>
          <p className="mb-0">Login to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Select Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#388e3c" }}
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="text-center my-3">
          <span className="text-muted">──────── OR ────────</span>
        </div>

        {/* Google Login Button (UI Only) */}
        <button
          type="button"
          className="btn w-100 d-flex align-items-center justify-content-center border"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: "500",
          }}
          onClick={() => alert("Google Login clicked (UI only)")}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            style={{ width: "20px", marginRight: "10px" }}
          />
          Login with Google
        </button>

        {/* Footer */}
        <div className="text-center mt-3">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#2e7d32", fontWeight: "bold" }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;