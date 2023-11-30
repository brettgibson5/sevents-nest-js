import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Patch('add-friend/:friendId')
  addFriend(
    @GetUser('id') userId: number,
    @Param('friendId', ParseIntPipe) friendId: number,
  ) {
    return this.userService.addFriend(userId, friendId);
  }

  @Patch('remove-friend/:friendId')
  removeFriend(
    @GetUser('id') userId: number,
    @Param('friendId', ParseIntPipe) friendId: number,
  ) {
    return this.userService.removeFriend(userId, friendId);
  }

  // see all users

  // see all friends
}
