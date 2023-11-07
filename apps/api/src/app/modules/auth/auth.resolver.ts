import { UsersService } from './../users/users.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { CurrentUser, MessageResponse } from '@social-zone/common';
import { LoginInput, LoginResponse } from './dto/login.dto';
import {
  UserDocument,
  UserWithoutPassword,
} from '../users/entities/user.entity';
import { IUser } from '../users/dto/user';
import { GqlAuthGuard } from './guards/auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') _loginInput: LoginInput
  ) {
    return await this.authService.validateLogin(_loginInput);
  }

  @Query(() => IUser, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: UserDocument) {
    delete user.password;
    return user;
  }

  @UseGuards()
  @Mutation(() => MessageResponse, { name: 'logout' })
  async logout() {
    return { message: 'Logout Success' };
  }
}
