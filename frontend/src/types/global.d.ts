type GameState = "playing" | "check" | "checkmate_w" | "checkmate_b" | "stalemate" | "draw"
 
interface ChessBoardProps {
  setGameState: React.Dispatch<SetStateAction<GameState>>;
  setHistotyOfMoves: React.Dispatch<SetStateAction<string[]>>
  histotyOfMoves: string[];
  chessPosition: string,
  setChessPosition: React.Dispatch<SetStateAction<string>>,
  chessGame: Chess
}

interface SideBarProps {
  isSidebarExpanded: boolean,
  setIsSidebarExpanded: React.Dispatch<SetStateAction<boolean>>
}

interface ChessBoardSidebarProps {
  historyOfMoves: HistoryMove[],
  prev: () => void,
  next: () => void,
  restart: () => void,
}

interface HistoryMove {
  from: string,
  to: string,
  piece: string,
  fen : string
}