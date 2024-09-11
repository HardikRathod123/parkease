import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CreateBooking } from './dtos/create.dto'
import { BookingQueryDto } from './dtos/query.dto'
import { UpdateBooking } from './dtos/update.dto'
import { BookingEntity } from './entity/booking.entity'

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BookingEntity })
  @Post()
  create(
    @Body() createBookingDto: CreateBooking,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createBookingDto.customerId)
    return this.prisma.booking.create({ data: createBookingDto })
  }

  @ApiOkResponse({ type: [BookingEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: BookingQueryDto) {
    return this.prisma.booking.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: BookingEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.booking.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: BookingEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBooking,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique({ where: { id } })
    checkRowLevelPermission(user, booking.customerId)
    return this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const booking = await this.prisma.booking.findUnique({ where: { id } })
    checkRowLevelPermission(user, booking.customerId)
    return this.prisma.booking.delete({ where: { id } })
  }
}
