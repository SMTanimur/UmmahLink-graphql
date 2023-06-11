import { UsersService } from './../users/users.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { Auth } from './entities/auth.entity';

import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { Logout } from './guards/logout.guard';
import { CurrentUser } from '@social-zone/common';
import {  LoginInput, LoginResponse } from './dto/login.dto';
import {  UserWithoutPassword } from '../users/entities/user.entity';
import { SessionAuthGuard } from './guards/session.guard';


@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard,SessionAuthGuard)
  async login(
    @CurrentUser() user: UserWithoutPassword,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('loginInput') _loginInput: LoginInput
  ) {
    return { message: `Welcome back! ${user.username}` };
  }

  @Query(() => UserWithoutPassword)
  @UseGuards(AuthenticatedGuard)
  whoAmI(@CurrentUser() user: UserWithoutPassword) {
    return user;
  }

  @UseGuards(Logout)
  @Query(() => String, { name: 'logout' })
  async logout() {
    return 'Logout Success';
  }

}
