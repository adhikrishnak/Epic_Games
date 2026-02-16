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

  const handleConsoleLogin = (platform) => {
    switch (platform) {
      case "playstation":
        window.open("https://my.account.sony.com/sonyacct/signin/?client_id=559bf940-f58b-41b4-9c4d-f60a5019f885&redirect_uri=https%3A%2F%2Fwww.epicgames.com%2Fid%2Foauth-authorized&state=eyJpZCI6ImI2NGExZjJlYTRiYTRiMTZiNGI2NDRjNTRhZjg1MzAzIn0%3D&scope=openid+psn%3As2s&response_type=code&display=popup&service_entity=urn%3Aservice-entity%3Apsn&ui=pr&cid=c878ae90-33e9-4d84-b9ff-89b93aad1f3a&error=login_required&error_code=4165&no_captcha=true#/signin/input/id");
        break;
      case "xbox":
        window.open("https://login.microsoft.com/consumers/fido/get?mkt=EN-US&lc=1033&uiflavor=web");
        break;
      case "nintendo":
        window.open("https://accounts.nintendo.com/authorize_guide?redirect_uri=https%3A%2F%2Faccounts.nintendo.com%2Fconnect%2F1.0.0%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3D1f6a6a4806931686%26redirect_uri%3Dhttps%253A%252F%252Faccounts.epicgames.com%252FOAuthAuthorized%26scope%3Dopenid%2Buser.screenName%26state%3DeyJpZCI6ImEyMzYyM2NiNmYxZDQ4ODJiOTQ1YjUxNTgzZWMwMjE0In0%253D%26nonce%3DzK4EeVxd%26interacted%3D1&type=mixed");
        break;
      default:
        break;
    }
  };

  const handleGoogleClick = () => {
    // ✅ Just redirect to Google site for now
    window.open("https://accounts.google.com/v3/signin/accountchooser?client_id=81931294547-ict6llss8611g9nglndn2bnln48bo59d.apps.googleusercontent.com&display=popup&nonce=3DP5Yvls&redirect_uri=https%3A%2F%2Faccounts.epicgames.com%2FOAuthAuthorized&response_type=code&scope=openid+email+profile&state=eyJpZCI6ImZlMjM5ZmExMjk2YzQwNjA5Y2Y1NTBjYjlhMzNhOWE4In0%3D&dsh=S-1307776734%3A1770921874136779&o2v=1&service=lso&flowName=GeneralOAuthFlow&opparams=%253F&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANVkcNQZuoTiikRi09eeQyzvRi3TPf3ZHCxydCq6SSw_s-SRGplClLgUqZsHSPI2YwZrrynMxl07M52A87b8hMPZbNNpkvbCBzgyk1fx0xikiwdVXBOLKn6hmpvqcSi065qq_IehhocHDT10uvhdy5I12_Hn7hm60xo28qA5hZx696ui_uqEKPdPnqOLJ_z2Ic577N5Mj-eUPkLg2wHNMBD8lbf_BW7aHC9x4jqBrXKdAxcST44iVaZDrBTxLhXm33iYFLi8zvqx2Ec27mu3LisTSwCTboJA71cWweiQhUSGm3mk_kyfH4oJTb403bOZWpAdkWsLMCJ1B6iidfgEKWZwZK-b2eg5CyXBbzA08tOMD9kqIG1z0dIDihBE0NQUXT07aF5lrXtS49cMmXFO2453_agWwqaFUfLOXDQFfa9lqEFcnNalTN2bFvoAQxnh_CDoMbb690iSYggfdO13adjheteSuAaLc2_7Be4uUgM4zAcHO8%26flowName%3DGeneralOAuthFlow%26as%3DS-1307776734%253A1770921874136779%26client_id%3D81931294547-ict6llss8611g9nglndn2bnln48bo59d.apps.googleusercontent.com%26requestPath%3D%252Fsignin%252Foauth%252Fconsent%23&app_domain=https%3A%2F%2Faccounts.epicgames.com");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Sign in to Epic Games</h1>

        <p>Only played on console?</p>
        <div className="platform-login">
          <button className="secondary" onClick={() => handleConsoleLogin("playstation")}>
            <FaPlaystation /> PlayStation™Network
          </button>
          <button className="secondary" onClick={() => handleConsoleLogin("xbox")}>
            <FaXbox /> Xbox Network
          </button>
          <button className="secondary" onClick={() => handleConsoleLogin("nintendo")}>
            <SiNintendo /> Nintendo Account
          </button>
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
          <button className="secondary" onClick={handleGoogleClick}>
            <FaGoogle /> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;