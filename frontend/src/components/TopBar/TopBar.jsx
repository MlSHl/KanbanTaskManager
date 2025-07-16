import LogoutButton from "../LogoutButton/LogoutButton";
import "./TopBar.css";

function TopBar({setIsAuthenticated}){
    return (
        <div className="topbar">
            <div className="app-name">TaskManager</div>
            <div>
                <span className="username">Welcome, test</span>
                <LogoutButton className="topbar-right" setIsAuthenticated={setIsAuthenticated}/>
            </div>
        </div>
    )
}

export default TopBar;