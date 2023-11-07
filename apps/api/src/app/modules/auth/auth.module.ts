import { UsersModule } from '../users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/
import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { JWTService } from './jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    // SessionSerializer,
    // SessionAuthGuard,
    JWTService,
    JwtStrategy,
    AuthenticatedGuard,
  ],
})
export class AuthModule {}
