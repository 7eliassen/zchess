import ChessBoard from "./components/ChessBoard"
import { useEffect, useState } from "react"

function App() {

  const [gameState, setGameState] = useState<GameState>("playing");
  
  useEffect(() => {
    if (gameState !== "playing")
      alert(gameState)
  }, [gameState])

  return (
  <div>
      <ChessBoard 
      setGameState={setGameState}
      />
  </div>
  )
}

export default App