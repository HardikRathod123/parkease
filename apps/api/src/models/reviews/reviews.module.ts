import { Module } from '@nestjs/common'
import { ReviewsResolver } from './graphql/reviews.resolver'
import { ReviewsService } from './graphql/reviews.service'
import { ReviewsController } from './rest/reviews.controller'

@Module({
  providers: [ReviewsResolver, ReviewsService],
  exports: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
