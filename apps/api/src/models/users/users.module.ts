import { Module } from '@nestjs/common'
import { UsersResolver } from './graphql/users.resolver'
import { UsersService } from './graphql/users.service'
import { UsersController } from './rest/users.controller'

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
