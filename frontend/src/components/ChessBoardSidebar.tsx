function ChessBoardSidebar({historyOfMoves, curHistoryMove,prev, next, restart}: ChessBoardSidebarProps) {
    return (
        <div className="chess-board-sidebar">
        <div className="history-content">
            {historyOfMoves.map((move, index) => <p className={index === curHistoryMove ? "history-item current-move" : "history-item"} key={index}>{move.piece} {move.from} {move.to}</p>)}
        </div>
        <footer>
            <button onClick={() => prev()}>Prev</button>
            <button onClick={() => next()}>Next</button>
            <button onClick={() => restart()}>Restart</button>
        </footer>
        </div>  
    )
}
export default ChessBoardSidebar