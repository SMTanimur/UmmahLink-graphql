import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { UserResolver } from './users.resolver';
import { User, UserSchema } from './entities/user.entity';
import { Follow, FollowSchema } from '../follows/entities/follow';
import { Post, PostSchema } from '../posts/entities/post';
import { UploadModule } from '../upload/upload.module';
import { JWTService } from '../auth/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Follow.name, schema: FollowSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    UploadModule,
  ],
  controllers: [],
  providers: [UsersService, UserResolver, JWTService],
  exports: [UsersService],
})
export class UsersModule {}
