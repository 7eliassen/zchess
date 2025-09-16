import Sidebar from "../components/Sidebar.tsx"
import "../styles/home.scss"
import { useState } from "react"
function Home() {

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

    return ( 
    <div className="home-container">
        <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        />
        <div className="home-content">
            <button className="game-button">Online game</button>
            <button className="game-button">Offline game</button>
        </div>
    </div>
)
}

export default Home