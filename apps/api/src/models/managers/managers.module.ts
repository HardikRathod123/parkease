import { Module } from '@nestjs/common'
import { ManagersResolver } from './graphql/managers.resolver'
import { ManagersService } from './graphql/managers.service'
import { ManagersController } from './rest/managers.controller'

@Module({
  providers: [ManagersResolver, ManagersService],
  exports: [ManagersService],
  controllers: [ManagersController],
})
export class ManagersModule {}
