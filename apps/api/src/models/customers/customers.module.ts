import { Module } from '@nestjs/common'
import { CustomersResolver } from './graphql/customers.resolver'
import { CustomersService } from './graphql/customers.service'
import { CustomersController } from './rest/customers.controller'

@Module({
  providers: [CustomersResolver, CustomersService],
  exports: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
