import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
  });

  // Handle Input Fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit + Send Data To Backend
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert("Registration failed! Check backend.");
      }
    } catch (error) {
      alert("Server Error!");
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
          width: "450px",
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
          <p className="mb-0">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Select Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
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
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/" style={{ color: "#2e7d32", fontWeight: "bold" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
