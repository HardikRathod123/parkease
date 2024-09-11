import { PartialType } from '@nestjs/swagger'
import { Review } from '@prisma/client'
import { CreateReview } from './create.dto'

export class UpdateReview extends PartialType(CreateReview) {
  id: Review['id']
}
