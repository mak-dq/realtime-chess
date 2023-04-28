import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PlayerDetailEntity } from '../../player/models/player.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { PlayerLoginDto } from '../../player/dtos/playerLogin.dto';
import { jwtConstants } from '../constants';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let playerDetailRepository: Repository<PlayerDetailEntity>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'PlayerDetailEntityRepository',
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    playerDetailRepository = module.get<Repository<PlayerDetailEntity>>(
      'PlayerDetailEntityRepository'
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('loginPlayer', () => {
    it('should throw an error if player not found', async () => {
      playerDetailRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        service.loginPlayer(new PlayerLoginDto())
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw an error if password is invalid', async () => {
      const playerDetail = new PlayerDetailEntity();
      playerDetail.password = await bcrypt.hash('password', 10);

      playerDetailRepository.findOne = jest
        .fn()
        .mockResolvedValue(playerDetail);
      bcrypt.compareSync = jest.fn().mockReturnValue(false);

      await expect(
        service.loginPlayer(new PlayerLoginDto())
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should return tokens if login is successful', async () => {
      const id = '123';
      const playerLoginDto: PlayerLoginDto = {
        email: 'johndoe@gmail.com',
        username: 'testuser',
        password: 'abcd',
      };
      beforeEach(() => {
        playerDetailRepository.findOne({
          select: ['id', 'username', 'password', 'email'],
          where: [
            {
              id: id,
              username: 'janedoe',
            },
            {
              id: id,
              email: 'janedoe@gmail.com',
            },
          ],
        });
      });
      bcrypt.compareSync = jest.fn().mockReturnValue(true);
      service.getToken = jest.fn().mockReturnValue({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      });
      service.updateRt = jest.fn();

      const result = await service.loginPlayer(new PlayerLoginDto());

      expect(result).toEqual({
        id: '1',
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      });
    });
  });

  describe('updateRt', () => {
    it('should update the refresh token in the database', async () => {
      playerDetailRepository.update = jest.fn().mockResolvedValue({} as any);

      const result = await service.updateRt('1', 'refresh_token');

      expect(result).toEqual({});
      expect(playerDetailRepository.update).toHaveBeenCalledWith('1', {
        refreshToken: expect.any(String),
      });
    });

    describe('logoutPlayer', () => {
      it('should throw an error if player not found', async () => {
        const id = '123';
        const username = 'johndoe';
        beforeEach(() => {
          playerDetailRepository.findOne({
            select: ['id', 'username', 'password', 'email'],
            where: {
              id: id,
              username: username,
            },
          });
        });
        await expect(
          service.logoutPlayer('1', 'testuser')
        ).rejects.toThrowError(UnauthorizedException);
      });
    });
  });
});
