/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from './entities/friendRequest';
import { FriendRequestsService } from './friendrequests.service';
import { FriendRequestResolver } from './friendrequests.resolver';
import { User, UserSchema } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendRequest.name, schema: FriendRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UsersModule
  ],
  providers: [FriendRequestsService,FriendRequestResolver],
  exports: [FriendRequestsService]
})
export class FriendRequestsModule {}
