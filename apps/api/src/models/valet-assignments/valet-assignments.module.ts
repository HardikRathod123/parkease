import { Module } from '@nestjs/common'
import { ValetAssignmentsResolver } from './graphql/valet-assignments.resolver'
import { ValetAssignmentsService } from './graphql/valet-assignments.service'
import { ValetAssignmentsController } from './rest/valet-assignments.controller'

@Module({
  providers: [ValetAssignmentsResolver, ValetAssignmentsService],
  exports: [ValetAssignmentsService],
  controllers: [ValetAssignmentsController],
})
export class ValetAssignmentsModule {}
