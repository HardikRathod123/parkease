import { InputType, PartialType } from '@nestjs/graphql'
import { Manager } from '@prisma/client'
import { CreateManagerInput } from './create-manager.input'

@InputType()
export class UpdateManagerInput extends PartialType(CreateManagerInput) {
  uid: Manager['uid']
}
