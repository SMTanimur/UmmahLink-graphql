import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { UserResolver } from './users.resolver';
import { User,  UserSchema } from './entities/user.entity';
import { Follow, FollowSchema } from '../follows/entities/follow';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Follow.name, schema: FollowSchema },
    ])
  ],
  controllers: [],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
