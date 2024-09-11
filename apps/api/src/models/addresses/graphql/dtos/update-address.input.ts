import { InputType, PartialType } from '@nestjs/graphql'
import { Address } from '@prisma/client'
import { CreateAddressInput } from './create-address.input'

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  id: Address['id']
}
