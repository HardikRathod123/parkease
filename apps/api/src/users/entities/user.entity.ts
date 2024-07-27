import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => String)
  uid: string
}
