import { PartialType } from '@nestjs/swagger'
import { Booking } from '@prisma/client'
import { CreateBooking } from './create.dto'

export class UpdateBooking extends PartialType(CreateBooking) {
  id: Booking['id']
}
