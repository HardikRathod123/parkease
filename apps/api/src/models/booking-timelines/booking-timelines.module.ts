import { Module } from '@nestjs/common'
import { BookingTimelinesResolver } from './graphql/booking-timelines.resolver'
import { BookingTimelinesService } from './graphql/booking-timelines.service'
import { BookingTimelinesController } from './rest/booking-timelines.controller'

@Module({
  providers: [BookingTimelinesResolver, BookingTimelinesService],
  exports: [BookingTimelinesService],
  controllers: [BookingTimelinesController],
})
export class BookingTimelinesModule {}
