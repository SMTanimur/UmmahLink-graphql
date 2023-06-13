import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { UserResolver } from './users.resolver';
import { User, UserSchema } from './entities/user.entity';
import { InfoModule } from '../Info/Info.module';
import { Info, InfoSchema } from '../Info/entities/info';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Info.name, schema: InfoSchema },
    ]),
    InfoModule,
  ],
  controllers: [],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
