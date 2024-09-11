import { InputType, PartialType } from '@nestjs/graphql'
import { Review } from '@prisma/client'
import { CreateReviewInput } from './create-review.input'

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  id: Review['id']
}
