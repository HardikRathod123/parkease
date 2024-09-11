import { InputType, PartialType } from '@nestjs/graphql'
import { Booking } from '@prisma/client'
import { CreateBookingInput } from './create-booking.input'

@InputType()
export class UpdateBookingInput extends PartialType(CreateBookingInput) {
  id: Booking['id']
}
