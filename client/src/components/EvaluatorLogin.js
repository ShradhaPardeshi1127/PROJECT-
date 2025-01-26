import React, { useState } from "react";
import "../styles/EvaluatorLogin.css";

const EvaluatorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Email:", email); // Debug log
    console.log("Password:", password); // Debug log
    console.log("Access Code:", accessCode); // Debug log

    try {
      const response = await fetch(
        "http://localhost:7000/login-options/evaluatorlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, accessCode }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Login error:", data.error); // Debug log
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      const data = await response.json();
      alert(data.message);
      window.location.href = "/evaluator-dashboard";
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="evaluator-login-container">
      <h1>Evaluator Login</h1>
      <p>Welcome back! Please enter your details to proceed</p>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Enter your email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password *</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ width: "100%" }}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="accessCode">Access Code *</label>
          <input
            type="text"
            id="accessCode"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter your access code"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="options">
          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                localStorage.setItem("rememberEvaluator", e.target.checked);
              }}
            />{" "}
            Remember me
          </label>
          <a
            href="/reset-password"
            className="reset-password-link"
            onClick={() => localStorage.setItem("emailToReset", email)}
          >
            Forgot password?
          </a>
        </div>
        <button type="submit" className="login-btn">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default EvaluatorLogin;
