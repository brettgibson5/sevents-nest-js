import {
  Controller,
  Post,
  Get,
  UseGuards,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { EventService } from './event.service';
import { GetUser } from '../auth/decorator';
import { CreateEventDto, EditEventDto } from './dto';
import { CreateRsvpDto } from 'src/shared/dto/create-rsvp.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { UserEventService } from 'src/shared/services/user-event.service';

@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
  constructor(
    private eventService: EventService,
    private userEventService: UserEventService,
  ) {}

  @Roles(Role.Admin, Role.Moderator)
  @Post()
  createEvent(@GetUser('id') userId: number, @Body() dto: CreateEventDto) {
    return this.eventService.createEvent(userId, dto);
  }

  @Get()
  getEvents() {
    return this.eventService.getEvents();
  }

  @Get(':id')
  getEventById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    return this.eventService.getEventById(userId, eventId);
  }

  @Get(':id/attendees')
  getEventRsvps(@Param('id', ParseIntPipe) eventId: number) {
    return this.userEventService.findEventRsvps(eventId);
  }

  @Get(':id/rsvp')
  getRsvp(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    return this.userEventService.getRsvp(userId, eventId);
  }

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

  @Roles(Role.Admin, Role.Moderator)
  @Patch(':id')
  editEventById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: EditEventDto,
  ) {
    return this.eventService.editEventById(userId, eventId, dto);
  }

  @Roles(Role.Admin, Role.Moderator)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteEventById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    return this.eventService.deleteEventById(userId, eventId);
  }
}
