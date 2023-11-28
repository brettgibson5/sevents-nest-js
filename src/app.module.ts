import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { PrismaModule } from './prisma/prisma.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    EventModule,
    PrismaModule,
    CityModule,
  ],
})
export class AppModule {}
