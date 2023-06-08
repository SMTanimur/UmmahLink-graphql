import { UsersModule } from '../users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { SessionAuthGuard } from './guards/session.guard';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    SessionSerializer,
    SessionAuthGuard,
    AuthenticatedGuard,
  ],
})
export class AuthModule {}
