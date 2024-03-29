import * as jwt from 'jsonwebtoken';
// import { default as config } from '../config';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { pick } from 'lodash';
import { ConfigurationService } from '@social-zone/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JWTService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly configurationService: ConfigurationService
  ) {}

  async createToken(email: string, role: string) {
    const expiresIn = '7d',
      secretOrKey = this.configurationService.JWT_SECRET_KEY;
    const userInfo = { email: email, role: role };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async createForgetPasswordToken(email: string) {
    const expiresIn = '15 min',
      secretOrKey = this.configurationService.JWT_SECRET_KEY;
    const userInfo = { email };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async createResetPasswordToken(email: string) {
    const expiresIn = '3 min',
      secretOrKey = this.configurationService.JWT_SECRET_KEY;
    const userInfo = { email };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<any> {
    const userFromDb = await this.userModel.findOne({
      email: signedUser.email,
    });
    if (userFromDb) {
      const userInfo = pick(userFromDb.toJSON(), [
        '_id',
       'avatar',
       'username',
       'email',
       'birthday',
       'bio',
       'name',
        'role',
      ]);
      return userInfo;
    }
    return null;
  }
}
