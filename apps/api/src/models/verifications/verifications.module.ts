import { Module } from '@nestjs/common'
import { VerificationsResolver } from './graphql/verifications.resolver'
import { VerificationsService } from './graphql/verifications.service'
import { VerificationsController } from './rest/verifications.controller'

@Module({
  providers: [VerificationsResolver, VerificationsService],
  exports: [VerificationsService],
  controllers: [VerificationsController],
})
export class VerificationsModule {}
