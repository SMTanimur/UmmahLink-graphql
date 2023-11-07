/* eslint-disable @typescript-eslint/ban-types */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JWTService } from '../jwt.service';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { ConfigurationService } from '@social-zone/common';
import { JwtPayload } from '../dto/jwt-payload.type';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JWTService,
    public readonly configurationService: ConfigurationService,
    public readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configurationService.JWT_SECRET_KEY,
    });
  }

  async validate({email}: JwtPayload) {
    const user = await this.usersService.findOne({email})
    delete user.password;
    return user;
  }
}
