import { InputType, PartialType } from '@nestjs/graphql'
import { Slot } from '@prisma/client'
import { CreateSlotInput } from './create-slot.input'

@InputType()
export class UpdateSlotInput extends PartialType(CreateSlotInput) {
  id: Slot['id']
}
