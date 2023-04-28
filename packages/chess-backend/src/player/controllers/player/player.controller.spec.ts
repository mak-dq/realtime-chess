import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';

import { CreatePlayerDto } from '../../dtos/createPlayer.dto';
import { PlayerDetailDto } from '../../dtos/playerDetail.dto';
import { ChangePasswordDto } from '../../dtos/changePassword.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Observable, async } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PlayerService } from '../../services/player/player.service';
import { PlayerDetailEntity } from '../../models/player.entity';
import { describe } from 'node:test';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;
  let repository: Repository<PlayerDetailEntity>;

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
      jest
        .spyOn(service, 'createPlayer')
        .mockResolvedValueOnce(playerDetailDto);

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
      jest
        .spyOn(service, 'createPlayer')
        .mockRejectedValueOnce(new Error('Player already present'));

      await expect(
        controller.createPlayer(createPlayerDto)
      ).rejects.toThrowError(
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
      jest.spyOn(service, 'getPlayer').mockResolvedValueOnce(
        new Observable<PlayerDetailDto[]>((subscriber) => {
          subscriber.next(playerDetailDto);
          subscriber.complete();
        })
      );

      const result = await controller.getPlayer();

      expect(result).toEqual(playerDetailDto);
      expect(service.getPlayer).toHaveBeenCalled();
    });
  });

  describe('getPlayerById', () => {
    it('should return an observable of player detail with matching id and loggedId', async () => {
      const id = '123';
      const loggedId = '123';
      const playerDetailDto: PlayerDetailDto = {
        fname: 'John',
        lname: 'Doe',
        age: 30,
        username: 'johndoe',
        email: 'johndoe@example.com',
      };

      const result = await controller.getPlayerById(id, loggedId);
      expect(result).toEqual(playerDetailDto);
      expect(service.getPlayerById).toHaveBeenCalled();

      jest.spyOn(service, 'getPlayerById').mockResolvedValueOnce(
        new Observable<PlayerDetailDto>((subscriber) => {
          subscriber.next(playerDetailDto);
          subscriber.complete();
        })
      );

      it('should throw a ForbiddenException when id and loggedId are different', async () => {
        const id = '123';
        const loggedId = '456';
        const expectedError = new ForbiddenException('Invalid access');

        await expect(service.getPlayerById(id, loggedId)).rejects.toThrow(
          expectedError
        );
      });
    });

    describe('deletePlayerById', () => {
      it('should delete the player with matching id and loggedId', async () => {
        const id = '123';
        const loggedId = '123';
        const expectedResult = { affected: 1 };

        const result = await service.deletePlayerById(id, loggedId);

        expect(result).toEqual(expectedResult);
        expect(service).toHaveBeenCalledWith(id);
      });

      it('should throw a ForbiddenException when id and loggedId are different', async () => {
        const id = '123';
        const loggedId = '456';
        const expectedError = new ForbiddenException('Invalid access');

        await expect(service.deletePlayerById(id, loggedId)).rejects.toThrow(
          expectedError
        );
      });
    });

    describe('updatePlayer', () => {
      it('should update the player with the matching id and loggedId', async () => {
        const id = '123';
        const loggedId = id;
        const playerDetailDto = {
          fname: 'John',
          lname: 'Doe',
          age: 30,
          email: 'john.doe@example.com',
          username: 'johndoe',
        };
        const updateResult = {
          affected: 1,
          raw: {},
        };

        beforeEach(() => {
          repository.findOneBy({
            id: id,
            email: 'jane.doe@example.com',
            username: 'janedoe',
          });
          repository.update(id, playerDetailDto);
        });

        it('should return an UpdateResult', async () => {
          const result = await service.updatePlayer(
            id,
            playerDetailDto,
            loggedId
          );
          expect(result).toEqual(updateResult);
        });

        it('should call findOneBy with the correct arguments', async () => {
          await service.updatePlayer(id, playerDetailDto, loggedId);
          expect(repository.findOneBy).toHaveBeenCalledWith([
            { id: id, email: playerDetailDto.email },
            { id: id, username: playerDetailDto.username },
          ]);
        });

        it('should call update with the correct arguments', async () => {
          await service.updatePlayer(id, playerDetailDto, loggedId);
          expect(repository.update).toHaveBeenCalledWith(id, {
            fname: playerDetailDto.fname,
            lname: playerDetailDto.lname,
            age: playerDetailDto.age,
          });
        });
      });

      describe('when called with invalid loggedId', () => {
        const id = '123';
        const loggedId = '456';
        const playerDetailDto = {
          fname: 'John',
          lname: 'Doe',
          age: 30,
          email: 'john.doe@example.com',
          username: 'johndoe',
        };

        it('should throw a ForbiddenException', async () => {
          await expect(
            service.updatePlayer(id, playerDetailDto, loggedId)
          ).rejects.toThrowError(ForbiddenException);
        });
      });

      describe('when player not found', () => {
        const id = '123';
        const loggedId = id;
        const playerDetailDto = {
          fname: 'John',
          lname: 'Doe',
          age: 30,
          email: 'john.doe@example.com',
          username: 'johndoe',
        };

        beforeEach(() => {
          repository.findOneBy(null);
        });

        it('should throw a NotFoundException', async () => {
          await expect(
            service.updatePlayer(id, playerDetailDto, loggedId)
          ).rejects.toThrowError(NotFoundException);
        });
      });
    });

    describe('changePassword', async () => {
      it('should update the player with the matching id and loggedId', async () => {
        const id = '123';
        const loggedId = id;
        const changePasswordDto: ChangePasswordDto = {
          username: 'johnDoe',
          password: 'johnDoe',
        };
        const updateResult = {
          affected: 1,
          raw: {},
        };

        beforeEach(() => {
          repository.findOneBy({
            id: id,
            username: 'janedoe',
          });
          repository.update(id, changePasswordDto);
        });

        it('should return an UpdateResult', async () => {
          const result = await service.changePassword(
            id,
            changePasswordDto,
            loggedId
          );
          expect(result).toEqual(updateResult);
        });

        it('should call findOneBy with the correct arguments', async () => {
          await service.changePassword(id, changePasswordDto, loggedId);
          expect(repository.findOneBy).toHaveBeenCalledWith([
            { id: id, username: changePasswordDto.username },
          ]);
        });

        it('should call update with the correct arguments', async () => {
          await service.changePassword(id, changePasswordDto, loggedId);
          expect(repository.update).toHaveBeenCalledWith(id, changePasswordDto);
        });
      });
      describe('when called with invalid loggedId', () => {
        const id = '123';
        const loggedId = '456';
        const changePasswordDto: ChangePasswordDto = {
          username: 'johnDoe',
          password: 'johnDoe',
        };
        
        it('should throw a ForbiddenException', async () => {
          await expect(
            service.changePassword(id, changePasswordDto, loggedId)
            ).rejects.toThrowError(ForbiddenException);
          });
        });
        
        describe('when player not found', ()=>{
        const id = '123';
        const loggedId = id;
        const changePasswordDto:ChangePasswordDto={
          username:null,
          password:null
        }

        beforeEach(()=>{
          repository.findOneBy(changePasswordDto)
        })

        it('should throw a NotFoundException', async ()=>{
          await expect(
            service.changePassword(id,changePasswordDto,loggedId)
          ).rejects.toThrowError(NotFoundException)
        })

      })
      });
    });
  });
