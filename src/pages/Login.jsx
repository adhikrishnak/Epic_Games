import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { 
  FaGoogle, 
  FaPlaystation, 
  FaXbox, 
  FaSteam, 
  FaApple, 
  FaFacebook, 
  FaGamepad, 
  FaQuestionCircle,
  FaPuzzlePiece,
  FaCircle
} from "react-icons/fa";
import { SiAutodesk } from "react-icons/si";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error(result.message || "Invalid credentials. Try epicgames@epic.com / epic123");
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
        
        <h1 className="auth-title">Sign in to Epic Games</h1>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-input-group">
            <input
              type="email"
              placeholder="Email address"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* For the "Continue" guided flow, usually password comes after email. 
              But for this demo, I'll keep them simple or assume the user knows the flow. 
              I'll add password for functionality. */}
          <div className="auth-input-group">
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn-primary">
            Continue
          </button>
        </form>

        <div className="auth-links-row">
          New here? <Link to="/signup" className="auth-link">Create an account</Link>
        </div>

        <div className="auth-divider-section">
          <div className="auth-divider-text">Only played on console?</div>
          <div className="footer-line"></div>
        </div>
        <p className="social-label" style={{marginBottom: "20px"}}>Sign in to access your progress and purchases</p>

        <div className="auth-social-grid">
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "#003087", color: "white"}}><FaPlaystation /></div>
            <span className="social-label">PlayStation™ Network</span>
          </div>
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "#107c10", color: "white"}}><FaXbox /></div>
            <span className="social-label">Xbox<br/>network</span>
          </div>
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "#e60012", color: "white"}}><FaGamepad /></div>
            <span className="social-label">Nintendo Account</span>
          </div>
        </div>

        <div className="auth-divider-section">
          <div className="auth-divider-text">Other ways to sign in</div>
        </div>

        <div className="auth-social-grid">
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "white", color: "black", padding: "6px"}}><FaGoogle /></div>
            <span className="social-label">Google</span>
          </div>
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "white", color: "black", padding: "6px"}}><FaSteam /></div>
            <span className="social-label">Steam</span>
          </div>
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "white", color: "black", padding: "6px"}}><FaCircle style={{fontSize: "0.8rem"}} /></div>
            <span className="social-label">Disney</span>
          </div>
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "white", color: "black", padding: "6px"}}><FaApple /></div>
            <span className="social-label">Sign in with Apple</span>
          </div>
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "#1877f2", color: "white", padding: "6px"}}><FaFacebook /></div>
            <span className="social-label">Facebook</span>
          </div>
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "white", color: "black", padding: "6px"}}><FaPuzzlePiece style={{color: "#f5af02"}} /></div>
            <span className="social-label">LEGO® Account</span>
          </div>
          <div className="auth-social-btn">
            <div className="social-icon-box" style={{background: "white", color: "black", padding: "6px"}}><SiAutodesk /></div>
            <span className="social-label">Autodesk</span>
          </div>
        </div>

        <div className="auth-footer">
          <a href="#" className="auth-footer-link">Trouble signing in?</a>
          <a href="#" className="auth-footer-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Login;