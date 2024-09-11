import { InputType, PartialType } from '@nestjs/graphql'
import { Verification } from '@prisma/client'
import { CreateVerificationInput } from './create-verification.input'

@InputType()
export class UpdateVerificationInput extends PartialType(
  CreateVerificationInput,
) {
  garageId: Verification['garageId']
}
