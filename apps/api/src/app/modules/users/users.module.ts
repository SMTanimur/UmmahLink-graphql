import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';

import { UserResolver } from './users.resolver';
import { User,  UserSchema } from './entities/user.entity';
import { Follow, FollowSchema } from '../follows/entities/follow';
import { PostsModule } from '../posts/posts.module';
import { Post, PostSchema } from '../posts/entities/post';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Follow.name, schema: FollowSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    forwardRef(() => PostsModule),
    UploadModule
  ],
  controllers: [],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
