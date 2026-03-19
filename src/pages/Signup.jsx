import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    news: false,
    terms: false
  });

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.terms) {
      toast.error("You must agree to the Terms of Service.");
      return;
    }
    const result = await signup({
      email: formData.email,
      password: formData.password,
      displayName: formData.displayName,
      firstName: formData.firstName,
      lastName: formData.lastName
    });
    
    if (result.success) {
      toast.success("Account created successfully!");
      navigate("/");
    } else {
      toast.error(result.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg" 
          alt="Epic Games" 
          className="auth-logo-center"
        />
        
        <h1 className="auth-title">Sign Up</h1>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="auth-input-group">
            <select className="auth-input" defaultValue="IN">
              <option value="IN">India</option>
              {/* Add more as needed */}
            </select>
          </div>

          <div className="auth-input-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="auth-input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="auth-input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <input
              type="text"
              name="displayName"
              placeholder="Display Name"
              className="auth-input"
              value={formData.displayName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="auth-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="news"
              id="news"
              checked={formData.news}
              onChange={handleChange}
            />
            <label htmlFor="news" className="checkbox-label-auth">
              I would like to receive news, surveys and special offers from Epic Games.
            </label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms" className="checkbox-label-auth">
              I have read and agree to the <a href="#" className="auth-link">Terms of Service</a>
            </label>
          </div>

          <button type="submit" className="auth-btn-primary">
            Continue
          </button>
        </form>

        <div className="auth-links-row" style={{marginTop: "30px"}}>
          Already have an Epic Games account? <Link to="/login" className="auth-link">Sign In</Link>
        </div>

        <div className="auth-footer">
          <a href="#" className="auth-footer-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;