
import { useState } from "react";
import { register } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function RegisterPage(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await register({email, username, password})
            const token = response.data;
            localStorage.setItem('token', token);
            // alert("Registration successful");
            navigate("/board");
        }catch(error){
            console.log("Registration failed:", error);
            alert("Registration failed: " + error.response?.data || error.message);
        }
    }

    return (

        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <input className="auth-input" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className="auth-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    );
}

export default RegisterPage;