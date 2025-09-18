type GameState = "playing" | "check" | "checkmate_w" | "checkmate_b" | "stalemate" | "draw"
 
interface ChessBoardProps {
  setGameState: React.Dispatch<SetStateAction<GameState>>;
  setHistoryOfMoves: React.Dispatch<SetStateAction<string[]>>
  historyOfMoves: HistoryMove[];
  chessPosition: string,
  setChessPosition: React.Dispatch<SetStateAction<string>>,
  chessGame: Chess,
  boardOrientation: 'white' | 'black',
  setBoardOrientation: React.Dispatch<SetStateAction<'white' | 'black'>>
}

interface SideBarProps {
  isSidebarExpanded: boolean,
  setIsSidebarExpanded: React.Dispatch<SetStateAction<boolean>>
}

interface ChessBoardSidebarProps {
  historyOfMoves: HistoryMove[],
  curHistoryMove: number,
  prev: () => void,
  next: () => void,
  restart: () => void,
}

interface HistoryMove {
  from?: string,
  to?: string,
  piece?: string,
  fen : string
}