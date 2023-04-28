import {faker} from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from '../../dtos/createPlayer.dto';
import { PlayerDetailDto } from '../../dtos/playerDetail.dto';
import { ChangePasswordDto } from '../../dtos/changePassword.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],

      providers: [
        {
          provide: PlayerService,
          useValue: {
            createPlayer: jest.fn(),
            getPlayer: jest.fn(),
            getPlayerById: jest.fn(),
            deletePlayerById: jest.fn(),
            updatePlayer: jest.fn(),
            changePassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
  });

  describe('createPlayer', () => {
    it('should create a player and return player details', async () => {
      const createPlayerDto: CreatePlayerDto = {
        fname: 'John',
        lname: 'Doe',
        age: 30,
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
      };
      const playerDetailDto: PlayerDetailDto = {
        fname: 'John',
        lname: 'Doe',
        age: 30,
        username: 'johndoe',
        email: 'johndoe@example.com',
      };
      jest.spyOn(service, 'createPlayer').mockResolvedValueOnce(playerDetailDto);

      const result = await controller.createPlayer(createPlayerDto);

      expect(result).toEqual(playerDetailDto);
      expect(service.createPlayer).toHaveBeenCalledWith(createPlayerDto);
    });

    it('should throw ConflictException if player already exists', async () => {
      const createPlayerDto: CreatePlayerDto = {
        fname: 'John',
        lname: 'Doe',
        age: 30,
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
      };
      jest.spyOn(service, 'createPlayer').mockRejectedValueOnce(new Error('Player already present'));

      await expect(controller.createPlayer(createPlayerDto)).rejects.toThrowError(
        new ForbiddenException('Already Present', {
          cause: new Error('Player already present'),
          description: 'Player is already registered',
        })
      );
    });
  });

  describe('getPlayer', () => {
    it('should return an observable of player details', async () => {
      const playerDetailDto: PlayerDetailDto[] = [
        {
          fname: 'John',
          lname: 'Doe',
          age: 30,
          username: 'johndoe',
          email: 'johndoe@example.com',
        },
      ];
      jest.spyOn(service, 'getPlayer').mockResolvedValueOnce(new Observable<PlayerDetailDto[]>(subscriber => {
        subscriber.next(playerDetailDto);
        subscriber.complete();
      }));

      const result = await controller.getPlayer();

      expect(result).toEqual(playerDetailDto);
      expect(service.getPlayer).toHaveBeenCalled();
    });
  });
  
  describe('getPlayerById', () => {
    it('should return an observable of player detail for matching id',async ()=> {
      const playerId = faker.random.alphaNumeric(16)
      try {
        await PlayerService.findOneByIdOrThrow(playerId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Player not found with this id');
      }
      const playerDetailDto: PlayerDetailDto =
      {
        fname: 'John',
        lname: 'Doe',
        age: 30,
        username: 'johndoe',
        email: 'johndoe@example.com',
      },
      
      const result = await controller.getPlayer();
      expect(result).toEqual(playerDetailDto);
      expect(service.getPlayer).toHaveBeenCalled();
    });

    describe('deletePlayerById', () => {
      let service: PlayerService;
    
      it('should delete the player with matching id and loggedId', async () => {
        const id = '123';
        const loggedId = '123';
        const expectedResult = { affected: 1 };
        jest.spyOn(PlayerService, 'delete').mockResolvedValue(expectedResult);
    
        const result = await service.deletePlayerById(id, loggedId);
    
        expect(result).toEqual(expectedResult);
        expect(PlayerService.delete).toHaveBeenCalledWith(id);
      });
    
      it('should throw a ForbiddenException when id and loggedId are different', async () => {
        const id = '123';
        const loggedId = '456';
        const expectedError = new ForbiddenException('Invalid access');
    
        await expect(service.deletePlayerById(id, loggedId)).rejects.toThrow(expectedError);
      });
    });
    
  });

