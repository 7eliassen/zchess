import { Chessboard } from 'react-chessboard'
import "../styles/game.scss"

function OnlineChessBoard() {
    return(
        <div className="game-container">
            <div className='chessboard'>
                <Chessboard />
            </div>
        </div>
    )
}

export default OnlineChessBoard