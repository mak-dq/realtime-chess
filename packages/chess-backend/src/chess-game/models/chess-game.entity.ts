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

  @Column({ type: 'json' })
  pieces: string[];

  @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor() {
    // Set the initial values of the `pieces` array to represent the default setup of chess pieces
    this.pieces = [
      'bR',
      'bN',
      'bB',
      'bQ',
      'bK',
      'bB',
      'bN',
      'bR',
      'bP',
      'bP',
      'bP',
      'bP',
      'bP',
      'bP',
      'bP',
      'bP',
      'wR',
      'wN',
      'ww',
      'wQ',
      'wK',
      'ww',
      'wN',
      'wR',
      'wP',
      'wP',
      'wP',
      'wP',
      'wP',
      'wP',
      'wP',
      'wP',
    ];

  }
}
