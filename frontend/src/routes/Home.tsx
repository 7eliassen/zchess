import Sidebar from "../components/Sidebar.tsx"
import "../styles/home.scss"
import { useState, useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CookiesProvider, useCookies } from 'react-cookie'
import OfflineGame from "../components/OfflineGame.tsx"
import OnlineGame from "../components/OnlineGameSearch.tsx"
import Profile from "../components/Profile.tsx"
import Settings from "../components/Settings.tsx"
import Archive from "../components/Archive.tsx"
import PlayGame from "../components/OnlineGamePlay.tsx"
import {api} from "../variables.tsx"
interface HomeProps {
  pageProp?: string | null;
}

function Home({ pageProp }: HomeProps) {
    const navigate = useNavigate();

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

    async function check() {
        try {
            const response = await api.get("/checklogin/", {withCredentials: true})
            console.log("Ответ сервера:", response.data)
        }
        catch (error: any) {
            console.error("Ошибка:", error)
            if (error.status === 401) {
                navigate("/login/")
            }
        }
    }

    useEffect(() => {
        check()
    }, [])

    const contentRender = () => {

        switch (pageProp) {
            case "playgame":
                return <PlayGame />
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
    
    // TODO: is not auth redirect to /login

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