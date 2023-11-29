import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [EventController],
  imports: [SharedModule],
  providers: [EventService],
})
export class EventModule {}
