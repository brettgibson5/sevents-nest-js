import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;
    return user;
  }

  async viewUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async addFriend(userId: number, friendId: number) {
    const friendship = await this.prisma.friendship.create({
      data: {
        userId: userId,
        friendId: friendId,
      },
    });

    return friendship;
  }

  async removeFriend(userId: number, friendId: number) {
    const friendship = await this.prisma.friendship.delete({
      where: {
        userId_friendId: {
          userId: userId,
          friendId: friendId,
        },
      },
    });

    return friendship;
  }
}
