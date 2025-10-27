import { Link } from "react-router-dom"
import { useState } from "react"
import "../styles/auth.scss"
import {api, API_URL} from "../variables"
import axios from "axios"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

async function login(user: string, passwd: string) {
  try {
    const csrfToken = Cookies.get('csrftoken')
    const response = await api.post("/login/",
      { username: user, password: passwd },
      {
        headers: {
          "X-CSRFToken": csrfToken, 
        },   withCredentials: true
      },
    );

    console.log("Ответ сервера:", response.data)
    navigate("/")
  } catch (error: any) {
    console.error("Ошибка:", error.message)
  }
}

  

  return (
    <div className="for-centered">
    <div className="auth-container">
        <img className="zchess-logo" src="/zchess_logo.png" alt="ZchessLogo" />
        <header>Log in</header>
        <form>
          <input type="text" placeholder="Enter your login" value={username} onChange={e => setUsername(e.target.value)}/>
          <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
          <input type="button" value="Login" onClick={() => {login(username, password)}}/>
        </form>
        <a href="#">Forgot password?</a>
        <div>
          <span className="auth-link">
            Don't have an account?
            <Link to="/register"> Sign up</Link>
          </span>
        </div>
      </div>
      </div>
  );
}

export default Login
