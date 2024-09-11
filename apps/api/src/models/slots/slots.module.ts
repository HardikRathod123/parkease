import { Module } from '@nestjs/common'
import { SlotsResolver } from './graphql/slots.resolver'
import { SlotsService } from './graphql/slots.service'
import { SlotsController } from './rest/slots.controller'

@Module({
  providers: [SlotsResolver, SlotsService],
  exports: [SlotsService],
  controllers: [SlotsController],
})
export class SlotsModule {}
