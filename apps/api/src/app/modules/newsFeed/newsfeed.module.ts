/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsFeed, NewsFeedSchema } from './entities/newsFeed';
import { NewsFeedService } from './newsfeed.service';
import { NewsFeedResolver } from './newsfeed.resolver';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewsFeed.name, schema: NewsFeedSchema },
    ])
  ],
  controllers: [],
  providers: [NewsFeedService, NewsFeedResolver],
})
export class NewsFeedModule {}
