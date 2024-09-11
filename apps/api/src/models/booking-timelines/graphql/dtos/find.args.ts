import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingTimelineOrderByWithRelationInput } from './order-by.args'
import {
  BookingTimelineWhereInput,
  BookingTimelineWhereUniqueInput,
} from './where.args'

registerEnumType(Prisma.BookingTimelineScalarFieldEnum, {
  name: 'BookingTimelineScalarFieldEnum',
})

@ArgsType()
class FindManyBookingTimelineArgsStrict
  implements
    RestrictProperties<
      FindManyBookingTimelineArgsStrict,
      Omit<Prisma.BookingTimelineFindManyArgs, 'include' | 'select'>
    >
{
  where: BookingTimelineWhereInput
  orderBy: BookingTimelineOrderByWithRelationInput[]
  cursor: BookingTimelineWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.BookingTimelineScalarFieldEnum])
  distinct: Prisma.BookingTimelineScalarFieldEnum[]
}

@ArgsType()
export class FindManyBookingTimelineArgs extends PartialType(
  FindManyBookingTimelineArgsStrict,
) {}

@ArgsType()
export class FindUniqueBookingTimelineArgs {
  where: BookingTimelineWhereUniqueInput
}
