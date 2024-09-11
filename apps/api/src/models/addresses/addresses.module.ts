import { Module } from '@nestjs/common'
import { AddressesResolver } from './graphql/addresses.resolver'
import { AddressesService } from './graphql/addresses.service'
import { AddressesController } from './rest/addresses.controller'

@Module({
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
