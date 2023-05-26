import { UsersService } from './../users/users.service';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { Auth } from './entities/auth.entity';

import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { SessionAuthGuard } from './guards/session.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { Logout } from './guards/logout.guard';
import { CurrentUser } from '@social-zone/common';
import {  LoginInput } from './dto/login.dto';
import { User, UserDocument } from '../users/entities/user.entity';


@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => User)
  @UseGuards(LocalAuthGuard, SessionAuthGuard)
  async login(
    @CurrentUser() user:UserDocument ,
    @Args('loginInput') _loginInput: LoginInput
  ) {


    // console.log({ user });
    return { message: 'Login Success', user:user.toJSON()  };
  }

  @Query(() => User)
  @UseGuards(AuthenticatedGuard)
  whoAmI(@CurrentUser() user:UserDocument) {
    return user;
  }

  @UseGuards(Logout)
  @Query(() => String, { name: 'logout' })
  async logout() {
    return 'Logout Success';
  }

  
}
