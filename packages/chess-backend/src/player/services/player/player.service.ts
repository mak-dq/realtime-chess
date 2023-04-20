import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerDetailEntity } from '../../models/player.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { PlayerDetailDto } from '../../dtos/playerDetail.dto';
import * as bcrypt from 'bcrypt';
import { CreatePlayerDto } from '../../dtos/createPlayer.dto';
import { ChangePasswordDto } from '../../dtos/changePassword.dto';
import { log } from 'console';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerDetailEntity)
    private readonly playerDetailRepository: Repository<PlayerDetailEntity>
  ) {}

  //Register Player
  async createPlayer(player: CreatePlayerDto): Promise<PlayerDetailDto> {
    try {
      const playerDetailToUpdate = await this.playerDetailRepository.findOne({
        where: {
          email: player.email.toLowerCase(),
          username: player.username.toLowerCase(),
        },
      });
      if (playerDetailToUpdate) throw new Error('Player already present');
    } catch (error) {
      throw new ConflictException('Already Present', {
        cause: error,
        description: 'Player is already registered',
      });
    }
    //encryption
    const hashPassword = await this.encryptPassword(player.password);
    player.password = hashPassword;
    //create and save player
    const newPlayer = this.playerDetailRepository.create(player);
    await this.playerDetailRepository.save(newPlayer);
    const playerDetail = new PlayerDetailDto();
    playerDetail.fname = newPlayer.fname;
    playerDetail.lname = newPlayer.lname;
    playerDetail.age = newPlayer.age;
    playerDetail.username = newPlayer.username;
    playerDetail.email = newPlayer.email;
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
  async deletePlayerById(id: number): Promise<DeleteResult> {
    return await this.playerDetailRepository.delete(id);
  }

  //Update Player By Email
  async updatePlayer(
    id: number,
    playerDetailDto: PlayerDetailDto
  ): Promise<UpdateResult> {
    let playerDetailToUpdate = null;
    try {
      playerDetailToUpdate = await this.playerDetailRepository.findOneBy([{
        id: id,
        email: playerDetailDto.email,
      },{
        id,
        username:playerDetailDto.username
      }]);
      if (!playerDetailToUpdate) throw new Error('Player not found');
    } catch (error) {
      throw new NotFoundException('Something not found', {
        cause: error,
        description: 'Player not found with this email',
      });
    }
    return await this.playerDetailRepository.update(id, {
      fname: playerDetailDto.fname,
      lname: playerDetailDto.lname,
      age: playerDetailDto.age,
    });
  }

  //Check Password
  async checkPassword(password: string, hashedPassword: string) {
    const match = await bcrypt.compareSync(password, hashedPassword);
    return match;
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
    newPassword: string
  ): Promise<UpdateResult> {
    const playerDetail = await this.playerDetailRepository.findOne({
      select: ['id', 'username', 'email', 'password'],
      where: { id, username: changePasswordDto.username },
    });
    if (!playerDetail) {
      throw new UnauthorizedException('Invalid Access');
    }

    const match = await this.checkPassword(
      changePasswordDto.password,
      playerDetail.password
    );
    if (!match) throw new UnauthorizedException('Incorrect Password');
    const hashedPassword = await this.encryptPassword(
      newPassword['newPassword']
    );

    return await this.playerDetailRepository.update(playerDetail.id, {
      password: hashedPassword,
    });
  }

  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
}
