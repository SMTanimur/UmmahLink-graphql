import { Resolver } from "@nestjs/graphql";
import { Follow } from "./entities/follow";
import { FollowsService } from "./follows.service";



@Resolver(() => Follow)
export class FollowsResolver {
  constructor(private readonly followService: FollowsService) {}

  
}
