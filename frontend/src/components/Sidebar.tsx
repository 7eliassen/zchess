import "../styles/sidebar.scss"
function Sidebar({isSidebarExpanded, setIsSidebarExpanded}: SideBarProps) {
    return (
        <div className="sidebar">
            <div className="sidebar-item" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                <img className="sidebar-picture" src={isSidebarExpanded ? "/arrow-left.svg" : "/arrow-right.svg"} alt="<-"/>
                {isSidebarExpanded && <p>Minimize</p>}
            </div>
            <div className="sidebar-item">
                <img className="sidebar-picture" src="/pawn.svg" alt="Game" />
                {isSidebarExpanded && <p>Game</p>}
            </div>
            <div className="sidebar-item">
                <img className="sidebar-picture" src="/archive.svg" alt="Archive" />
                {isSidebarExpanded && <p>Archive</p>}
            </div>

            {/* Here's gap */}

            <div className="sidebar-item bottom">
                <img className="sidebar-picture bottom" src="/user-profile.svg" alt="Profile" />
                {isSidebarExpanded && <p>Profile</p>}
            </div>
            <div className="sidebar-item">
                <img className="sidebar-picture" src="/settings.svg" alt="Settings" />
                {isSidebarExpanded && <p>Settings</p>}
            </div>

        </div>
    );
}

export default Sidebar