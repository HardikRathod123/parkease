import { Field, Float, InputType, PickType } from '@nestjs/graphql'
import { Garage, SlotType } from '@prisma/client'
import { Booking } from '../entity/booking.entity'

@InputType()
export class CreateBookingInput extends PickType(
  Booking,
  ['customerId', 'endTime', 'startTime', 'vehicleNumber', 'phoneNumber'],
  InputType,
) {
  garageId: Garage['id']
  @Field(() => SlotType)
  type: SlotType

  @Field(() => Float)
  pricePerHour?: number
  @Field(() => Float)
  totalPrice?: number
}
