import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { CompanyOrderByWithRelationInput } from './order-by.args'
import { CompanyWhereInput, CompanyWhereUniqueInput } from './where.args'

registerEnumType(Prisma.CompanyScalarFieldEnum, {
  name: 'CompanyScalarFieldEnum',
})

@ArgsType()
class FindManyCompanyArgsStrict
  implements
    RestrictProperties<
      FindManyCompanyArgsStrict,
      Omit<Prisma.CompanyFindManyArgs, 'include' | 'select'>
    >
{
  where: CompanyWhereInput
  orderBy: CompanyOrderByWithRelationInput[]
  cursor: CompanyWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.CompanyScalarFieldEnum])
  distinct: Prisma.CompanyScalarFieldEnum[]
}

@ArgsType()
export class FindManyCompanyArgs extends PartialType(
  FindManyCompanyArgsStrict,
) {}

@ArgsType()
export class FindUniqueCompanyArgs {
  where: CompanyWhereUniqueInput
}
