import { PartialType } from '@nestjs/swagger'
import { Admin } from '@prisma/client'
import { CreateAdmin } from './create.dto'

export class UpdateAdmin extends PartialType(CreateAdmin) {
  uid: Admin['uid']
}
