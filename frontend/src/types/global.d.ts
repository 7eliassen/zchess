type GameState = "playing" | "check" | "checkmate_w" | "checkmate_b" | "stalemate" | "draw"

interface ChessBoardProps {
  setGameState: React.Dispatch<SetStateAction<GameState>>;
}