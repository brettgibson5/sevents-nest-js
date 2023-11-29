import {
  Controller,
  UseGuards,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Get,
  Body,
} from '@nestjs/common';
import { UserEventService } from '../services/user-event.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { CreateRsvpDto } from '../dto/create-rsvp.dto';

@UseGuards(JwtGuard)
@Controller('rsvp')
export class UserEventController {
  constructor(private userEventService: UserEventService) {}

  @Post(':id')
  saveRsvp(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: CreateRsvpDto,
  ) {
    return this.userEventService.saveRsvp({
      userId,
      eventId,
      attending: dto.attending,
    });
  }

  @Get(':id')
  getRsvp(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    return this.userEventService.getRsvp(userId, eventId);
  }
}
