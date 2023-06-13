/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: CallableFunction): any {
    return done(null, user);
  }
  async deserializeUser(
    payload: any,
    done: CallableFunction
  ): Promise<any> {
    const user = (await this.usersService.findUserById(payload._id))
    delete user.password
    return done(null, user);
  }
}
