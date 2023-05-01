import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlayerStat } from "./player-stat.interface";
import { PlayerDetailEntity } from "../../player/models/player.entity";

@Entity('player-stat')
export class PlayerStatEntity implements PlayerStat{
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @OneToOne(()=> PlayerDetailEntity, (player)=>player.id)
    @JoinColumn()
    player:PlayerDetailEntity;
    @Column()
    gameCount: number;
    @Column()
    winCount: number;
    @Column()
    lossCount: number;
    @Column({type:'time with time zone', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}