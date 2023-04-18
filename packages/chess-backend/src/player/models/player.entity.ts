import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('player_detail')
export class PlayerDetailEntity{
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
   @Column()
   password: string;
   @Column({unique:true,nullable:true})
   token!: string;
   @Column({type:'time with time zone', default: ()=> 'CURRENT_TIMESTAMP'})
   createdAt: Date;

   // constructor(partial: Partial<PlayerDetailEntity>) {
   //    Object.assign(this, partial);
   //  }
}