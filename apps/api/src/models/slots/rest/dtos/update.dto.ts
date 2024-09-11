import { PartialType } from '@nestjs/swagger'
import { Slot } from '@prisma/client'
import { CreateSlot } from './create.dto'

export class UpdateSlot extends PartialType(CreateSlot) {
  id: Slot['id']
}
