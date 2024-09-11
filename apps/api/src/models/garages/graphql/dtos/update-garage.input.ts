import { InputType, PartialType } from '@nestjs/graphql'
import { Garage } from '@prisma/client'
import { CreateGarageInput } from './create-garage.input'

@InputType()
export class UpdateGarageInput extends PartialType(CreateGarageInput) {
  id: Garage['id']
}
