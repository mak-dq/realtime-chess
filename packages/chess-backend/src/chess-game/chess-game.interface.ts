export interface ChessGame {
  id?: number;
  playerIds?: object;
  winnerId?: number;
  loserId?: number;
  moves?: string[];
  createdAt?: Date;
}
