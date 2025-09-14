import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/auth.scss"

function Registration () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [secPassword, setSecPassword] = useState('')
    const [email, setEmail] = useState('')

    return (
    <div className="for-centered">
      <div className="auth-container">
        <img className="zchess-logo" src="/zchess_logo.png" alt="ZchessLogo" />
        <header>Signup</header>
        <form>
          <input type="text" placeholder="Enter your login" value={username} onChange={e => setUsername(e.target.value)}/>
          <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirm your password" value={secPassword} onChange={e => setSecPassword(e.target.value)}/>
          <input type="submit" value="Signup"/>
        </form>
        <span className="auth-link">
            Already have an account? 
            <Link to="/login"> Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Registration