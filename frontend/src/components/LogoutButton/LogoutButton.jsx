import { useNavigate } from "react-router-dom";

function LogoutButton({setIsAuthenticated}){

    const navigate = useNavigate();    

    function handleLogout(){
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton;