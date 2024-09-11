import { Module } from '@nestjs/common'
import { GaragesResolver } from './graphql/garages.resolver'
import { GaragesService } from './graphql/garages.service'
import { GaragesController } from './rest/garages.controller'

@Module({
  providers: [GaragesResolver, GaragesService],
  exports: [GaragesService],
  controllers: [GaragesController],
})
export class GaragesModule {}
