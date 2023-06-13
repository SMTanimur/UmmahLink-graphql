import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Post, PostSchema } from './entities/post';
import { PostResolver } from './posts.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UsersModule
  ],
  controllers: [],
  providers: [PostsService,PostResolver],
})
export class PostsModule {}
