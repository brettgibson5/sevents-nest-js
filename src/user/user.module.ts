import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [UserController],
  imports: [SharedModule],
  providers: [UserService],
})
export class UserModule {}
