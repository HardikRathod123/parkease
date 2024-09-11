import { Prisma } from '@prisma/client'
import { IsIn, IsOptional } from 'class-validator'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class AddressQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.AddressScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.AddressScalarFieldEnum))
  searchBy?: string
}
