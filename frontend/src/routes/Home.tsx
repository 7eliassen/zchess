import Sidebar from "../components/Sidebar.tsx"
import "../styles/home.scss"
import { useState, useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom";

import OfflineGame from "../components/OfflineGame.tsx"
import OnlineGame from "../components/OnlineGame.tsx"
import Profile from "../components/Profile.tsx";
import Settings from "../components/Settings.tsx";
import Archive from "../components/Archive.tsx"
interface HomeProps {
  pageProp?: string | null;
}

function Home({ pageProp }: HomeProps) {
    const navigate = useNavigate();

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

    const contentRender = () => {

        switch (pageProp) {
            case "offlinegame":
                return <OfflineGame />
            case "onlinegame":
                return <OnlineGame />
            case "profile":
                return <Profile />
            case "settings":
                return <Settings />
            case "archive":
                return <Archive />
            case "newgame":
            default:
                return(<>
                        <button className="game-button" onClick={() => navigate("/offlinegame")}>Offline</button>
                        <button className="game-button" onClick={() => navigate("/onlinegame")}>Online</button>
                        
                    </>
                )
        }
    }


    return ( 
    <div className="home-container">
        <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        />
        <div className="home-content">
            {contentRender()}
        </div>
    </div>
     );
}

export default Home