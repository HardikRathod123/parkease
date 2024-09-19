import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
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

  @AllowAuthenticated('admin', 'manager')
  @Mutation(() => BookingTimeline)
  async createBookingTimeline(
    @Args('createBookingTimelineInput')
    { bookingId, status }: CreateBookingTimelineInput,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        Slot: {
          select: {
            Garage: {
              select: {
                Company: {
                  select: { Managers: { select: { uid: true } } },
                },
              },
            },
          },
        },
      },
    })
    checkRowLevelPermission(
      user,
      booking.Slot.Garage.Company.Managers.map((manager) => manager.uid),
    )

    const [, bookingTimeline] = await this.prisma.$transaction([
      this.prisma.booking.update({
        data: { status: status },
        where: { id: bookingId },
      }),
      this.prisma.bookingTimeline.create({
        data: { bookingId, managerId: user.uid, status },
      }),
    ])
    return bookingTimeline
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
}
