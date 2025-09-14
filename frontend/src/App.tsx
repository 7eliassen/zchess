import ChessBoard from "./components/ChessBoard"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Registration from "./routes/Registration.js"
import Login from "./routes/Login.js"
import "./styles/index.scss"

function App() {

  const [gameState, setGameState] = useState<GameState>("playing");
  
  useEffect(() => {
    if (gameState !== "playing")
      alert(gameState)
  }, [gameState])

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChessBoard setGameState={setGameState}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App