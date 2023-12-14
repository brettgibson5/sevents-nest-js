import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { PrismaModule } from './prisma/prisma.module';
import { CityModule } from './city/city.module';
import { SharedModule } from './shared/shared.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards';

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
    SharedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
