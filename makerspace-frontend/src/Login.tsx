import { useState } from "react";
import "./Login.css";
import quinnipacLogo from './assets/Logo.svg'
import { useNavigate } from "react-router-dom";

function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = (): void => {
        navigate('/home');
    }

    return (
        <div className="login">
            <div className="top">
                <img className="logo" src={quinnipacLogo}/>
                <p className="login-text">Login</p>
            </div>
            <div className="bottom">
                <input className="input-field" type="text" placeholder="Username" />
                <input className="input-field" type="password" placeholder="Password" />
                <button className="login-button" onClick={handleLogin}>Login</button>
                <p className="error-text">{errorMessage}</p>
            </div>
        </div>
    );
}

export default Login;