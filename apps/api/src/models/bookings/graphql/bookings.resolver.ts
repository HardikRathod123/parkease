import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { Customer } from 'src/models/customers/graphql/entity/customer.entity'
import { Slot } from 'src/models/slots/graphql/entity/slot.entity'
import { ValetAssignment } from 'src/models/valet-assignments/graphql/entity/valet-assignment.entity'
import { BookingsService } from './bookings.service'
import { CreateBookingInput } from './dtos/create-booking.input'
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dtos/find.args'
import { UpdateBookingInput } from './dtos/update-booking.input'
import { Booking } from './entity/booking.entity'

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Booking)
  createBooking(
    @Args('createBookingInput') args: CreateBookingInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId)
    return this.bookingsService.create(args)
  }

  @Query(() => [Booking], { name: 'bookings' })
  findAll(@Args() args: FindManyBookingArgs) {
    return this.bookingsService.findAll(args)
  }

  @Query(() => Booking, { name: 'booking' })
  findOne(@Args() args: FindUniqueBookingArgs) {
    return this.bookingsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Booking)
  async updateBooking(
    @Args('updateBookingInput') args: UpdateBookingInput,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: args.id },
    })
    checkRowLevelPermission(user, booking.customerId)
    return this.bookingsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Booking)
  async removeBooking(
    @Args() args: FindUniqueBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique(args)
    checkRowLevelPermission(user, booking.customerId)
    return this.bookingsService.remove(args)
  }

  @ResolveField(() => Slot)
  slot(@Parent() booking: Booking) {
    return this.prisma.slot.findFirst({ where: { id: booking.slotId } })
  }

  @ResolveField(() => Customer)
  customer(@Parent() booking: Booking) {
    return this.prisma.customer.findFirst({
      where: { uid: booking.customerId },
    })
  }

  @ResolveField(() => ValetAssignment, { nullable: true })
  valetAssignment(@Parent() booking: Booking) {
    return this.prisma.valetAssignment.findFirst({
      where: { bookingId: booking.id },
    })
  }
}
