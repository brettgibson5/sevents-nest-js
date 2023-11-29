import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEventDto, EditEventDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}
  getEvents() {
    return this.prisma.event.findMany({});
  }

  getEventById(userId: number, eventId: number) {
    return this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
  }

  async createEvent(userId: number, dto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: { ...dto },
    });

    return event;
  }

  async editEventById(userId: number, eventId: number, dto: EditEventDto) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: { ...dto },
    });
  }

  async deleteEventById(userId: number, eventId: number) {
    console.log(userId);
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      throw new ForbiddenException('Access denied');
    }
    await this.prisma.event.delete({
      where: {
        id: eventId,
      },
    });
  }
}
