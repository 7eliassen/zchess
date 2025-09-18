import ChessBoard from "./components/OfflineChessBoard.tsx"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "./styles/index.scss"
import "./styles/classes.scss"

//Import Routes
import Registration from "./routes/Registration.tsx"
import Login from "./routes/Login.tsx"
import Home from "./routes/Home.tsx"


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home pageProp="newgame"/>}/>
        <Route path="/home" element={<Home pageProp="newgame"/>}/>
        <Route path="/offlinegame" element={<Home pageProp="offlinegame"/>}/>
        <Route path="/onlinegame" element={<Home pageProp="onlinegame"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<Home pageProp="profile"/>} />
        <Route path="/settings" element={<Home pageProp="settings"/>} />
        <Route path="/archive" element={<Home pageProp="archive"/>} />
      </Routes>
    </BrowserRouter>


  )
}

export default App