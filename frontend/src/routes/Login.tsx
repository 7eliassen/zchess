import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/auth.scss"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="for-centered">
    <div className="auth-container">
        <img className="zchess-logo" src="/zchess_logo.png" alt="ZchessLogo" />
        <header>Login</header>
        <form>
          <input type="text" placeholder="Enter your login" value={username} onChange={e => setUsername(e.target.value)}/>
          <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
          <input type="button" value="Login"/>
        </form>
        <a href="#">Forgot password?</a>
        <div>
          <span className="auth-link">
            Don't have an account?
            <Link to="/register"> Signup</Link>
          </span>
        </div>
      </div>
      </div>
  );
}

export default Login
