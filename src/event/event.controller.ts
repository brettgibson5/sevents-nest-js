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

@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}
  @Post()
  createEvent(@GetUser('id') userId: number, @Body() dto: CreateEventDto) {
    return this.eventService.createEvent(userId, dto);
  }

  @Get()
  getEvents(@GetUser('id') userId: number) {
    return this.eventService.getEvents(userId);
  }

  @Get(':id')
  getEventById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    return this.eventService.getEventById(userId, eventId);
  }

  @Patch(':id')
  editEventById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: EditEventDto,
  ) {
    return this.eventService.editEventById(userId, eventId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteEventById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    return this.eventService.deleteEventById(userId, eventId);
  }
}
