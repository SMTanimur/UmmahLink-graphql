/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow, FollowDocument } from './entities/follow';
import { Model } from 'mongoose';

@Injectable()
export class FollowsService {

  constructor(@InjectModel(Follow.name) private followModel: Model<FollowDocument>) { }
 
}
