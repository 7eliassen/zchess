import "../styles/sidebar.scss"
import { useNavigate } from "react-router-dom";
function Sidebar({isSidebarExpanded, setIsSidebarExpanded}: SideBarProps) {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="sidebar-item" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                <img className="sidebar-picture" src={isSidebarExpanded ? "/arrow-left.svg" : "/arrow-right.svg"} alt="<-"/>
                {isSidebarExpanded && <p>Minimize</p>}
            </div>
            <div className="sidebar-item" onClick={() => navigate("/home")}>
                <img className="sidebar-picture" src="/pawn.svg" alt="Game" />
                {isSidebarExpanded && <p>Game</p>}
            </div>
            <div className="sidebar-item" onClick={() => navigate("/archive")}>
                <img className="sidebar-picture" src="/archive.svg" alt="Archive" />
                {isSidebarExpanded && <p>Archive</p>}
            </div>

            {/* Here's gap */}

            <div className="sidebar-item bottom" onClick={() => navigate("/profile")}>
                <img className="sidebar-picture bottom" src="/user-profile.svg" alt="Profile" />
                {isSidebarExpanded && <p>Profile</p>}
            </div>
            <div className="sidebar-item" onClick={() => navigate("/settings")}>
                <img className="sidebar-picture" src="/settings.svg" alt="Settings" />
                {isSidebarExpanded && <p>Settings</p>}
            </div>

        </div>
    );
}

export default Sidebar