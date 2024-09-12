import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Booking } from 'src/models/bookings/graphql/entity/booking.entity'
import { BookingTimelinesService } from './booking-timelines.service'
import { CreateBookingTimelineInput } from './dtos/create-booking-timeline.input'
import {
  FindManyBookingTimelineArgs,
  FindUniqueBookingTimelineArgs,
} from './dtos/find.args'
import { UpdateBookingTimelineInput } from './dtos/update-booking-timeline.input'
import { BookingTimeline } from './entity/booking-timeline.entity'

@Resolver(() => BookingTimeline)
export class BookingTimelinesResolver {
  constructor(
    private readonly bookingTimelinesService: BookingTimelinesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Mutation(() => BookingTimeline)
  createBookingTimeline(
    @Args('createBookingTimelineInput') args: CreateBookingTimelineInput,
  ) {
    return this.bookingTimelinesService.create(args)
  }

  @Query(() => [BookingTimeline], { name: 'bookingTimelines' })
  findAll(@Args() args: FindManyBookingTimelineArgs) {
    return this.bookingTimelinesService.findAll(args)
  }

  @Query(() => BookingTimeline, { name: 'bookingTimeline' })
  findOne(@Args() args: FindUniqueBookingTimelineArgs) {
    return this.bookingTimelinesService.findOne(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => BookingTimeline)
  async updateBookingTimeline(
    @Args('updateBookingTimelineInput') args: UpdateBookingTimelineInput,
  ) {
    return this.bookingTimelinesService.update(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => BookingTimeline)
  async removeBookingTimeline(@Args() args: FindUniqueBookingTimelineArgs) {
    return this.bookingTimelinesService.remove(args)
  }

  @ResolveField(() => Booking)
  booking(@Parent() bookingTimeline: BookingTimeline) {
    return this.prisma.booking.findFirst({
      where: { id: bookingTimeline.bookingId },
    })
  }
}
