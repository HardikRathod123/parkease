import { Module } from '@nestjs/common'
import { ValetsResolver } from './graphql/valets.resolver'
import { ValetsService } from './graphql/valets.service'
import { ValetsController } from './rest/valets.controller'

@Module({
  providers: [ValetsResolver, ValetsService],
  exports: [ValetsService],
  controllers: [ValetsController],
})
export class ValetsModule {}
