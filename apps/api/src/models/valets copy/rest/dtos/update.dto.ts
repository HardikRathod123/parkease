import { PartialType } from '@nestjs/swagger'
import { Valet } from '@prisma/client'
import { CreateValet } from './create.dto'

export class UpdateValet extends PartialType(CreateValet) {
  uid: Valet['uid']
}
