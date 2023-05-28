import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext): unknown {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    /**
     * key point: assign input args to req.body
     * passport-local strategy lookup username/password from req.body or req.query
     * https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js#L71-L72
     */
    request.body = ctx.getArgs().loginInput
    return request;
  }
}
