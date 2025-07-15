import { useState } from "react";
import { login } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function LoginPage({setIsAuthenticated}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await login({username, password})
            const token = response.data;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            // alert("Login successful");
            navigate("/board");
        }catch(error){
            console.log("Login failed:", error);
            alert("Login failed: " + error.response?.data || error.message);
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <input className="auth-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    );
}

export default LoginPage;