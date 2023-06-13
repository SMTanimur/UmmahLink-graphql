import { MongooseModule } from '@nestjs/mongoose';
import { FollowsService } from './follows.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Follow, FollowSchema } from './entities/follow';
import { FollowsResolver } from './follows.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
  ],
  controllers: [],
  providers: [FollowsService,FollowsResolver],
})
export class FollowsModule {}
