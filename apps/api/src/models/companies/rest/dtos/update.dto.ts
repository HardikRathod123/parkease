import { PartialType } from '@nestjs/swagger'
import { Company } from '@prisma/client'
import { CreateCompany } from './create.dto'

export class UpdateCompany extends PartialType(CreateCompany) {
  id: Company['id']
}
