import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'
import { Role } from 'src/common/types'

import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from './auth.guard'

export const AllowAuthenticated = (...roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard))

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const context = GqlExecutionContext.create(ctx)
  return context.getContext().req.user
})
