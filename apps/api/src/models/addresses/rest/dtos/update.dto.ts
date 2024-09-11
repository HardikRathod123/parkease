import { PartialType } from '@nestjs/swagger'
import { Address } from '@prisma/client'
import { CreateAddress } from './create.dto'

export class UpdateAddress extends PartialType(CreateAddress) {
  id: Address['id']
}
