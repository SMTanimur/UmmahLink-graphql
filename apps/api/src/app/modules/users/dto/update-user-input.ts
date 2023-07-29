import { InputType, PartialType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";


@InputType()
export class UpdateUserInput extends PartialType(User, InputType) {
}