import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaPlaystation, FaXbox, FaGoogle } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Sign in to Epic Games</h1>

        <p>Only played on console?</p>
        <div className="platform-login">
          <button className="secondary"><FaPlaystation /> PlayStation™Network</button>
          <button className="secondary"><FaXbox /> Xbox Network</button>
          <button className="secondary"><SiNintendo /> Nintendo Account</button>
        </div>

        <p>Played on PC or mobile?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Continue</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="signup-link">
          New here? <a href="/signup">Create an account</a>
        </p>

        <p>Other ways to sign in:</p>
        <div className="platform-login">
          <button className="secondary"><FaGoogle /> Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;