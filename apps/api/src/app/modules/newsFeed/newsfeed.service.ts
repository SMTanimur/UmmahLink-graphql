/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NewsFeed, NewsFeedDocument } from './entities/newsFeed';
import { Model } from 'mongoose';

@Injectable()
export class NewsFeedService {

  constructor( @InjectModel(NewsFeed.name) private newsFeedModel: Model<NewsFeedDocument>){}
}
