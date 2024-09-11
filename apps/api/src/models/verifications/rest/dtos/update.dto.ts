import { PartialType } from '@nestjs/swagger'
import { Verification } from '@prisma/client'
import { CreateVerification } from './create.dto'

export class UpdateVerification extends PartialType(CreateVerification) {
  garageId: Verification['garageId']
}
