import { PartialType } from '@nestjs/swagger'
import { Garage } from '@prisma/client'
import { CreateGarage } from './create.dto'

export class UpdateGarage extends PartialType(CreateGarage) {
  id: Garage['id']
}
