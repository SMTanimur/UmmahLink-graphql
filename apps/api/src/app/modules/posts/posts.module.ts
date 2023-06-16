import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Post, PostSchema } from './entities/post';
import { PostResolver } from './posts.resolver';
import { UsersModule } from '../users/users.module';
import { Like, LikeSchema } from './entities/like';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
    UsersModule,
  ],
  controllers: [],
  providers: [PostsService, PostResolver],
})
export class PostsModule {}
