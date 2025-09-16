import ChessBoard from "./OfflineChessBoard"
import { useState, useEffect} from "react"
import ChessBoardSidebar from "./ChessBoardSidebar"
import "../styles/game.scss"
import { Chess } from "chess.js"


const defaultPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

function OfflineGame() {
    const [histotyOfMoves, setHistotyOfMoves] = useState<HistoryMove[]>([])
    const [gameState, setGameState] = useState<GameState>("playing")
    const [chessPosition, setChessPosition] = useState(defaultPosition)
    const [chessGame, setChessGame] = useState(new Chess())
    const [curHistoryMove, setCurHistoryMove] = useState<number | null>(null)

    useEffect(() => {
        console.log(histotyOfMoves)
    }, [histotyOfMoves])

    useEffect(() => {
        if (gameState !== "playing")
        alert(gameState)
    }, [gameState])

    const restart = () => {
        setHistotyOfMoves([])
        setGameState("playing")
        setChessPosition(defaultPosition)
        setChessGame(new Chess())
    }

    const prev = () => {
        setChessPosition(histotyOfMoves[histotyOfMoves.length - 2].fen)
    }

    const next = () => {
/*************  ✨ Windsurf Command ⭐  *************/
        const nextMove = histotyOfMoves[histotyOfMoves.length - 1]
        if (nextMove) {
            setChessPosition(nextMove.fen)
        } else {
            alert("No more moves")
        }
/*******  7f1c0b6b-9cee-4b9e-a91f-92b267c5374b  *******/    
    }

    return (
        <div className="game-container">
            <ChessBoard setGameState={setGameState}
            setHistotyOfMoves={setHistotyOfMoves}
            histotyOfMoves={histotyOfMoves}
            chessPosition={chessPosition}
            setChessPosition={setChessPosition}
            chessGame={chessGame}/>
            <ChessBoardSidebar
            restart={restart}
            prev={prev}
            next={next}
            historyOfMoves={histotyOfMoves}/>
        </div>

    )
}

export default OfflineGame