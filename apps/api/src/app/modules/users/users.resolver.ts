import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user-input';
import { User } from './entities/user.entity';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CurrentUser, MessageResponse, PaginateOptionArgs } from '@social-zone/common';
import { UpdateUserInput } from './dto/update-user-input';
import { ProfileInformation } from './dto/ProfileData';
import { IUser } from './dto/user';
import { SearchDto } from './dto/search.query.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => String)
  async createUser(@Args('createUserInput') createUser: CreateUserInput) {
    return await this.usersService.createUser(createUser);
  }

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => MessageResponse)
  async updateUser(
    @CurrentUser() user: any,
    @Args('input') updateUser: UpdateUserInput,
    @Args('username',{ type: () => String })  username: string
  ) {
    return await this.usersService.updateUser(user, updateUser,username);
  }

  // @Mutation(() => String)
  // @UseGuards(AuthenticatedGuard)
  // async createOrUpdateInfo(
  //   @CurrentUser() user: any,
  //   @Args('createOrUpdateProfileInput')
  //   createOrUpdateProfileInput: CreateOrUpdateProfileInput
  // ) {
  //   createOrUpdateProfileInput.user = user._id;
  //   return this.usersService.createOrUpdateProfile(
  //     user._id,
  //     createOrUpdateProfileInput
  //   );
  // }

  @Query((_returns) => ProfileInformation, { nullable: true, name: 'user' })
  @UseGuards(AuthenticatedGuard)
  async getUserInfo(
    @Args('username', { type: () => String }) username: string,
    @CurrentUser() user: any
  ) {
    return await this.usersService.findUserByUsername(username, user);
  }

  @Query((_returns) => [IUser], {nullable:true, name: 'searchUser' })
  @UseGuards(AuthenticatedGuard)
  async searchUser(
    @Args('query') query: SearchDto,
    @Args('option') options: PaginateOptionArgs,
    @CurrentUser() user: any
  ) {
    query.user = user;
    return await this.usersService.searchUser(query, options);
  }
}
