import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { CustomerOrderByWithRelationInput } from './order-by.args'
import { CustomerWhereInput, CustomerWhereUniqueInput } from './where.args'

registerEnumType(Prisma.CustomerScalarFieldEnum, {
  name: 'CustomerScalarFieldEnum',
})

@ArgsType()
class FindManyCustomerArgsStrict
  implements
    RestrictProperties<
      FindManyCustomerArgsStrict,
      Omit<Prisma.CustomerFindManyArgs, 'include' | 'select'>
    >
{
  where: CustomerWhereInput
  orderBy: CustomerOrderByWithRelationInput[]
  cursor: CustomerWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.CustomerScalarFieldEnum])
  distinct: Prisma.CustomerScalarFieldEnum[]
}

@ArgsType()
export class FindManyCustomerArgs extends PartialType(
  FindManyCustomerArgsStrict,
) {}

@ArgsType()
export class FindUniqueCustomerArgs {
  where: CustomerWhereUniqueInput
}
