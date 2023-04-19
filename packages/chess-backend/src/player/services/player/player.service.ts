import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerDetailEntity } from '../../models/player.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { PlayerDetailDto } from '../../dtos/playerDetail.dto';
import * as bcrypt from 'bcrypt';
import { CreatePlayerDto } from '../../dtos/createPlayer.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerDetailEntity)
    private readonly playerDetailRepository: Repository<PlayerDetailEntity>
  ) {}

  //Register Player
  async createPlayer(player: CreatePlayerDto): Promise<PlayerDetailDto>{
    try {

      const playerDetailToUpdate = await this.playerDetailRepository.findOne({
        where:{email:player.email.toLowerCase() , username:player.username.toLowerCase()},
      });
      if (playerDetailToUpdate) throw new Error('Player already present');
    } catch (error) {
      throw new ConflictException('Already Present', {
        cause: error,
        description: 'Player is already registered',
      });
    }
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(player.password, salt);
    player.password = hashPassword;
    const newPlayer=(this.playerDetailRepository.create(player));
    await this.playerDetailRepository.save(newPlayer)
    const playerDetail=new PlayerDetailDto();
    playerDetail.id= newPlayer.id;
    playerDetail.fname= newPlayer.fname;
    playerDetail.lname= newPlayer.lname;
    playerDetail.age= newPlayer.age;
    playerDetail.username= newPlayer.username;
    playerDetail.email= newPlayer.email;
    return playerDetail;
  }

  //Get All Players
  async getPlayer(): Promise<Observable<PlayerDetailDto[]>> {
    return await from(this.playerDetailRepository.find());
  }

  //Get Player By Id
  async getPlayerById(id: number): Promise<Observable<PlayerDetailDto>> {
    return await from(this.playerDetailRepository.findOneBy({ id: id }));
  }

  //Delete Player By Id
  deletePlayerById(id: number): Observable<DeleteResult> {
    return from(this.playerDetailRepository.delete(id));
  }

  //Update Player By Email
  async updatePlayerById(
    playerDetailDto: PlayerDetailDto
  ): Promise<Observable<UpdateResult>> {
    let playerDetailToUpdate = null;
    try {
      playerDetailToUpdate = await this.playerDetailRepository.findOneBy({
        email: playerDetailDto.email,
      });
      if (!playerDetailToUpdate) throw new Error('Player not found');
    } catch (error) {
      throw new NotFoundException('Something not found', {
        cause: error,
        description: 'Player not found with this email',
      });
    }
    return this.playerDetailRepository.save(playerDetailToUpdate);
  }

  //Check Password
  async checkPassword(password: string, hashedPassword: string) {
    console.log("check");
    try {
      
      const match = await bcrypt.compareSync(password, hashedPassword);
      console.log(match);
      if (match == false) {
        throw new Error('Invalid Password');
      }
    } catch (error) {
     console.log(error);
      
    }
      
  }
}
