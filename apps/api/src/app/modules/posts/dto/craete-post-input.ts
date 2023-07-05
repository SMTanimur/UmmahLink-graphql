import { InputType, PickType } from "@nestjs/graphql";
import { Post } from "../entities/post";





@InputType()
export class CreatePostInput extends PickType(
  Post,
  ['_author_id','content','photos'],
  InputType
) {}