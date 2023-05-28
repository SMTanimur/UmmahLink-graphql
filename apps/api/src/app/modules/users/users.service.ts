/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user-input';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from '../../utils/hash';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}
   
  async createUser(createUser:CreateUserInput): Promise<any> {
    try {
      const user = await this.userModel.findOne({email:createUser.email,username:createUser.username});
      if(user){
      return new ConflictException('User already exists')
      }
      createUser.password = await createHash(createUser.password)
      return await this.userModel.create(createUser);

    } catch (error) {
      
    }
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).select('-password');

    if (!user) return null;

    return user;
  }
  async findOne(query: object): Promise<UserDocument> {
    const user = await this.userModel.findOne(query);

    if (!user) return null;

    return user;
  }
}
