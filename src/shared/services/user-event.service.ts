import { Injectable } from '@nestjs/common';
import { EditRsvpDto } from '../dto/edit-rsvp.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserEventService {
  constructor(private prisma: PrismaService) {}

  // async findAllUserEvents() {
  //   return this.prisma.userEvent.findMany();
  // }

  async findUserRsvps(userId: number) {
    return this.prisma.userEvent.findMany({
      where: { userId },
    });
  }

  async findEventRsvps(eventId: number) {
    return this.prisma.userEvent.findMany({
      where: { eventId },
    });
  }

  async saveRsvp(editRsvpDto: EditRsvpDto) {
    const { attending, eventId, userId } = editRsvpDto;
    const previousRsvp = await this.getRsvp(userId, eventId);
    if (previousRsvp) {
      return this.prisma.userEvent.update({
        where: {
          id: previousRsvp['id'],
        },
        data: {
          attending,
          eventId,
          userId,
        },
      });
    } else {
      return this.prisma.userEvent.create({
        data: {
          attending,
          eventId,
          userId,
        },
      });
    }
  }

  async getRsvp(userId: number, eventId: number) {
    return this.prisma.userEvent.findFirst({
      where: {
        userId,
        eventId,
      },
    });
  }
}
