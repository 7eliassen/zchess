import ChessBoard from "./OfflineChessBoard"
import { useState, useEffect} from "react"
import ChessBoardSidebar from "./ChessBoardSidebar"
import "../styles/game.scss"
import { Chess } from "chess.js"


const defaultPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

function OfflineGame() {
    const [historyOfMoves, setHistoryOfMoves] = useState<HistoryMove[]>([{fen: defaultPosition} as HistoryMove])
    const [gameState, setGameState] = useState<GameState>("playing")
    const [chessPosition, setChessPosition] = useState(defaultPosition)
    const [chessGame, setChessGame] = useState(new Chess())
    const [curHistoryMove, setCurHistoryMove] = useState<number>(0)
    const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');


    useEffect(() => {
        console.log(curHistoryMove)
    }, [curHistoryMove])

    useEffect(() => {
        if (gameState !== "playing")
        alert(gameState)
    }, [gameState])

    useEffect(() => {
        console.log(curHistoryMove)
        setChessPosition(historyOfMoves[curHistoryMove as number].fen)
    }, [curHistoryMove])

    useEffect(() => {
        setCurHistoryMove(historyOfMoves.length - 1)
    }, [historyOfMoves])

    const restart = () => {
        setHistoryOfMoves([{fen: defaultPosition} as HistoryMove])
        setCurHistoryMove(0)
        setGameState("playing")
        setChessGame(new Chess())
        setChessPosition(defaultPosition)
    }

    const prev = () => {
        setCurHistoryMove(curHistoryMove !== null && curHistoryMove > 0 ? curHistoryMove - 1 : 0)
    }

    const next = () => {
        setCurHistoryMove(curHistoryMove !== null && curHistoryMove < historyOfMoves.length - 1 ? curHistoryMove + 1 : historyOfMoves.length - 1)
    }

    return (
        <div className="game-container">
            <ChessBoard setGameState={setGameState}
            setHistoryOfMoves={setHistoryOfMoves}
            historyOfMoves={historyOfMoves}
            chessPosition={chessPosition}
            setChessPosition={setChessPosition}
            chessGame={chessGame}
            boardOrientation={boardOrientation}
            setBoardOrientation={setBoardOrientation}/>
            <ChessBoardSidebar
            restart={restart}
            prev={prev}
            next={next}
            historyOfMoves={historyOfMoves}
            curHistoryMove={curHistoryMove}/>
        </div>

    )
}

export default OfflineGame