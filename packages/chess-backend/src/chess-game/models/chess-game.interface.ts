export interface ChessGame {
  id?: string;
  whiteId?:string;
  blackId?:string;
  winnerId?: string;
  loserId?: string;
  moves?: string[];
  createdAt?: Date;
}
