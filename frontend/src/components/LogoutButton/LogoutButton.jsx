import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

function LogoutButton({setIsAuthenticated}){

    const navigate = useNavigate();    

    function handleLogout(){
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    }

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton;