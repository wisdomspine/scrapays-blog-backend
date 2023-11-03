import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportGuard('jwt') {
  canActivate(context: ExecutionContext) {
    if (!['graphql'].includes(context.getType())) {
      // The guard only works on graphql endpoints
      return true;
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
