import { PartialType } from '@nestjs/swagger'
import { Manager } from '@prisma/client'
import { CreateManager } from './create.dto'

export class UpdateManager extends PartialType(CreateManager) {
  uid: Manager['uid']
}
