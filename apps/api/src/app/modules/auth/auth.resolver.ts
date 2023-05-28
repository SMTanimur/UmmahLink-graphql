import { UsersService } from './../users/users.service';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { Auth } from './entities/auth.entity';

import { Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { Logout } from './guards/logout.guard';
import { CurrentUser } from '@social-zone/common';
import {  LoginInput, LoginResponse } from './dto/login.dto';
import { User, UserDocument } from '../users/entities/user.entity';


@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginInput') _loginInput: LoginInput
  ) {
    // console.log({ user });
    return { message: 'Login Success' };
  }

  @Query(() => User)
  @UseGuards(AuthenticatedGuard)
  Me(@Req() req: any) {
    return this.usersService.findUserById(req.user._id)
  }

  @UseGuards(Logout)
  @Query(() => String, { name: 'logout' })
  async logout() {
    return 'Logout Success';
  }

  
}
