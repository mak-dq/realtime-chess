import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ChessGame } from './chess-game.interface';

@Entity('chess-game')
export class ChessGameEntity implements ChessGame{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', array: true, nullable: true })
  playerIds: number[];

  @Column()
  winnerId: number;

  @Column()
  loserId: number;

  @Column({ type: 'json' })
  moves: string[];

  @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
