import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local.guard';
import { CreateUserInput } from './dto/input/create-user-input';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('input') createUser: CreateUserInput) {
    return await this.usersService.createUser(createUser);
  }
}
