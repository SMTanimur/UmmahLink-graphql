import { InputType, PickType } from "@nestjs/graphql";
import { Post } from "../entities/post";





@InputType()
export class CreatePostInput extends PickType(
  Post,
  ['author','content','image'],
  InputType
) {}