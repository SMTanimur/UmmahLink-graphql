/*
https://docs.nestjs.com/providers#services
*/

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/entities/user.entity';
import { JWTService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JWTService
  ) {}
  async validateUser(loginDto: LoginInput): Promise<UserDocument> {
    const user = await this.usersService.findOne({ email: loginDto.email });

    if (user && (await user.comparePassword(loginDto.password))) {
      return user;
    }

    return null;
  }

  async validateLogin(loginDto: LoginInput): Promise<{
    token: string;
    message: string;
  }> {
    const { email, password } = loginDto;

    const exitUser = await this.usersService.findOne({ email });

    if (!exitUser) throw new NotFoundException('User not found');

    const user = await this.usersService.findOne({ email });

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException('The password you entered is incorrect.');
    }

    const { access_token, expires_in } = await this.jwtService.createToken(
      user.email,
      user.role
    );

    return {
      token: access_token,
      message: `Welcome back ${user.name}! 🎉`,
    };
  }
}
