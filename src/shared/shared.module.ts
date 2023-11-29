import { Module } from '@nestjs/common';
import { UserEventService } from './services/user-event.service';

@Module({
  providers: [UserEventService],
  exports: [UserEventService],
})
export class SharedModule {}
