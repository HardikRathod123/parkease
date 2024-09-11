import { PartialType } from '@nestjs/swagger'
import { ValetAssignment } from '@prisma/client'
import { CreateValetAssignment } from './create.dto'

export class UpdateValetAssignment extends PartialType(CreateValetAssignment) {
  bookingId: ValetAssignment['bookingId']
}
