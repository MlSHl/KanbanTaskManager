import LogoutButton from "../LogoutButton/LogoutButton";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

function TopBar({setIsAuthenticated, username, setBoard}){
    const navigate = useNavigate();

    function handleGoToBoards(){
        setBoard(null);       // this tells Home to render BoardsPage
        navigate("/home");
    }

    return (
        <div className="topbar">
            <div className="topbar-left">
                <span className="app-name">TaskManager</span>
                <div className="divider"></div>
                <button onClick={handleGoToBoards} className="topbar-link">Boards</button>
            </div>
            <div>
                <span className="username">Signed in as <strong>{username} </strong></span>
                <LogoutButton className="topbar-right" setIsAuthenticated={setIsAuthenticated}/>
            </div>
        </div>
    )
}

export default TopBar;