import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from './enum/role.enum';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        role: Role.User,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');
    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.hashRt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }

  // async signup(dto: AuthDto) {
  //   const hash = await argon.hash(dto.password);
  //   try {
  //     const user = await this.prisma.user.create({
  //       data: {
  //         email: dto.email,
  //         hash,
  //         role: Role.User,
  //       },
  //     });
  //     return this.signToken(user.id, user.email);
  //   } catch (error) {
  //     if (error instanceof PrismaClientKnownRequestError) {
  //       if (error.code === 'P2002') {
  //         throw new ForbiddenException('Credentials taken');
  //       }
  //     }
  //     throw error;
  //   }
  // }

  // async signin(dto: AuthDto) {
  //   // find user by email
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: dto.email,
  //     },
  //   });
  //   // if user does not exist throw exception
  //   if (!user) throw new ForbiddenException('Credentials incorrect');
  //   // compare password
  //   const pwMatches = await argon.verify(user.hash, dto.password);
  //   // if password incorrect throw exception
  //   if (!pwMatches) {
  //     throw new ForbiddenException('Credentials incorrect');
  //   }
  //   return this.signToken(user.id, user.email);
  // }

  // async signToken(
  //   userId: number,
  //   email: string,
  // ): Promise<{ access_token: string }> {
  //   const payload = {
  //     sub: userId,
  //     email,
  //   };
  //   const secret = this.config.get('JWT_SECRET');

  //   const token = await this.jwt.signAsync(payload, {
  //     expiresIn: '60m',
  //     secret: secret,
  //   });

  //   return {
  //     access_token: token,
  //   };
  // }
}
