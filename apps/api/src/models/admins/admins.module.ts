import { Module } from '@nestjs/common'
import { AdminsResolver } from './graphql/admins.resolver'
import { AdminsService } from './graphql/admins.service'
import { AdminsController } from './rest/admins.controller'

@Module({
  providers: [AdminsResolver, AdminsService],
  exports: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
