import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user-input';
import { User } from './entities/user.entity';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CurrentUser } from '@social-zone/common';
import { UpdateUserInput } from './dto/update-user-input';
import { CreateOrUpdateProfileInput } from '../Info/dto/create-profile.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => String)
  async createUser(@Args('createUserInput') createUser: CreateUserInput) {
    return await this.usersService.createUser(createUser);
  }

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => String)
  async updateUser(
    @CurrentUser() user: any,
    @Args('input') updateUser: UpdateUserInput
  ) {
    return await this.usersService.updateUser(user?._id, updateUser);
  }

  @Mutation(() => String)
  @UseGuards(AuthenticatedGuard)
  async createOrUpdateInfo(
    @CurrentUser() user: any,
    @Args('createOrUpdateProfileInput')
    createOrUpdateProfileInput: CreateOrUpdateProfileInput
  ) {

    createOrUpdateProfileInput.user=user._id
    return this.usersService.createOrUpdateProfile(
      user._id,
      createOrUpdateProfileInput
    );
  }
}
