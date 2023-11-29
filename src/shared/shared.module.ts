import { Module } from '@nestjs/common';
import { UserEventService } from './services/user-event.service';
import { UserEventController } from './controllers/user-event.controller';

@Module({
  controllers: [UserEventController],
  providers: [UserEventService],
})
export class SharedModule {}
