import { Field, InputType,ObjectType,PickType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';


@InputType()
export class LoginInput extends PickType(
  User,
  ['email', 'password'],
  InputType
  
) {}


@ObjectType()
export class LoginResponse {
  @Field()
  message: string;
}

