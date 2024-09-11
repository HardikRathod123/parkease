import { PartialType } from '@nestjs/swagger'
import { BookingTimeline } from '@prisma/client'
import { CreateBookingTimeline } from './create.dto'

export class UpdateBookingTimeline extends PartialType(CreateBookingTimeline) {
  id: BookingTimeline['id']
}
