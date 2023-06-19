import { InputType, PickType } from "@nestjs/graphql";
import { Comment } from "../entities/comment";






@InputType()
export class CreateCommentInput extends PickType(
  Comment,
  ['authId', 'body','postId'],
  InputType
) {}