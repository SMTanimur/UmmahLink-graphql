/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/entities/user.entity';


@Injectable()
export class AuthService {

  constructor( private readonly usersService:UsersService) { }
  async validateUser(loginDto: LoginInput): Promise<UserDocument> {
    const user = await (await this.usersService.findOne({ email: loginDto.email }))

    if (user && (await user.comparePassword(loginDto.password))) {
      return user
    }

    return null
  }
}
