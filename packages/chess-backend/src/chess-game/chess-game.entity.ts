import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ChessGame } from './chess-game.interface';

@Entity('chess-game')
export class ChessGameEntity implements ChessGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  whiteId: string;
  @Column()
  blackId: string;

  @Column()
  winnerId: string;

  @Column()
  loserId: string;

  @Column()
  isDraw: boolean;

  @Column({ type: 'json' })
  moves: string[];

  @Column({type:'json'})
  pieces:string[]

  @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor() {
    // Set the initial values of the `pieces` array to represent the default setup of chess pieces
    this.pieces = [
      'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
      'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
      'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    ];
  }
}
