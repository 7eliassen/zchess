import ChessBoard from "./components/ChessBoard"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "./styles/index.scss"
import "./styles/classes.scss"

//Import Routes
import Registration from "./routes/Registration.tsx"
import Login from "./routes/Login.tsx"
import Home from "./routes/Home.tsx"

function App() {

  // const [gameState, setGameState] = useState<GameState>("playing"); <ChessBoard setGameState={setGameState}/>
  
  // useEffect(() => {
  //   if (gameState !== "playing")
  //     alert(gameState)
  // }, [gameState])

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App