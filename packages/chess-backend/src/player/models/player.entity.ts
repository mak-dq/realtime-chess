import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PlayerDetail } from "./player.interface";

@Entity('player_detail')
export class PlayerDetailEntity implements PlayerDetail{
   @PrimaryGeneratedColumn("uuid")
   id: number;
   @Column()
   fname: string;
   @Column()
   lname: string;
   @Column()
   age: number;
   @Column({unique:true})
   username: string;
   @Column({unique:true})
   email: string;
   @Column({select:false})
   password: string;
   @Column({select:false, nullable:true})
   refreshToken: string;
   @Column({type:'time with time zone', default: ()=> 'CURRENT_TIMESTAMP'})
   createdAt: Date;

   // constructor(partial: Partial<PlayerDetailEntity>) {
   //    Object.assign(this, partial);
   //  }
}