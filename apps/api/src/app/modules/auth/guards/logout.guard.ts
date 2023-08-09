import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


@Injectable()
export class Logout implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const res = ctx.getContext().res;
    if (req.isAuthenticated()) {
      await req.session.destroy(() => null);
      await req.logout(() => null);
      await res.clearCookie('ummahlink_sid');
    }

    return true;
  }
  }

