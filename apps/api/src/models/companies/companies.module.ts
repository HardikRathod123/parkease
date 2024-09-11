import { Module } from '@nestjs/common'
import { CompaniesResolver } from './graphql/companies.resolver'
import { CompaniesService } from './graphql/companies.service'
import { CompaniesController } from './rest/companies.controller'

@Module({
  providers: [CompaniesResolver, CompaniesService],
  exports: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
