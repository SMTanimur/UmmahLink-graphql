import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
 
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = GqlExecutionContext.create(context).getContext().req;
   
    const authenticated: boolean = req.isAuthenticated();
    if (authenticated) {
      return authenticated;
    }
    throw new UnauthorizedException('You are not authenticated');
  }
}
