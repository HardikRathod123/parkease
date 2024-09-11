import { InputType, PartialType } from '@nestjs/graphql'
import { Company } from '@prisma/client'
import { CreateCompanyInput } from './create-company.input'

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  id: Company['id']
}
