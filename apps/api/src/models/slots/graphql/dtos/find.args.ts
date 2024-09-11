import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { SlotOrderByWithRelationInput } from './order-by.args'
import { SlotWhereInput, SlotWhereUniqueInput } from './where.args'

registerEnumType(Prisma.SlotScalarFieldEnum, {
  name: 'SlotScalarFieldEnum',
})

@ArgsType()
class FindManySlotArgsStrict
  implements
    RestrictProperties<
      FindManySlotArgsStrict,
      Omit<Prisma.SlotFindManyArgs, 'include' | 'select'>
    >
{
  where: SlotWhereInput
  orderBy: SlotOrderByWithRelationInput[]
  cursor: SlotWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.SlotScalarFieldEnum])
  distinct: Prisma.SlotScalarFieldEnum[]
}

@ArgsType()
export class FindManySlotArgs extends PartialType(FindManySlotArgsStrict) {}

@ArgsType()
export class FindUniqueSlotArgs {
  where: SlotWhereUniqueInput
}
