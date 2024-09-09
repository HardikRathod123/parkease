import {
  ArgsType,
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

export type RestrictProperties<T, U> = {
  [K in keyof T]: K extends keyof U ? T[K] : never
} & Required<U>

// implements Prisma.DateTimeFilter
@InputType()
export class DateTimeFilter {
  @Field(() => String, { nullable: true })
  equals?: string;
  @Field(() => [String], { nullable: true })
  in?: string[]
  @Field(() => [String], { nullable: true })
  notIn?: string[]
  @Field(() => String, { nullable: true })
  lt?: string
  @Field(() => String, { nullable: true })
  lte?: string
  @Field(() => String, { nullable: true })
  gt?: string
  @Field(() => String, { nullable: true })
  gte?: string
}

registerEnumType(Prisma.QueryMode, {
  name: 'QueryMode',
})

// implements Required<Prisma.StringFilter>
@InputType()
export class StringFilter {
  @Field(() => String, { nullable: true })
  equals?: string;
  @Field(() => [String], { nullable: true })
  in?: string[]
  @Field(() => [String], { nullable: true })
  notIn?: string[]
  @Field(() => String, { nullable: true })
  lt?: string
  @Field(() => String, { nullable: true })
  lte?: string
  @Field(() => String, { nullable: true })
  gt?: string
  @Field(() => String, { nullable: true })
  gte?: string
  @Field(() => String, { nullable: true })
  contains?: string
  @Field(() => String, { nullable: true })
  startsWith?: string
  @Field(() => String, { nullable: true })
  endsWith?: string
  @Field(() => String, { nullable: true })
  not?: string
  @Field(() => Prisma.QueryMode, { nullable: true })
  mode?: Prisma.QueryMode
}
@InputType()
export class StringListFilter {
  @Field(() => [String], { nullable: true })
  equals?: string[]
  @Field(() => String, { nullable: true })
  has?: string
  @Field(() => [String], { nullable: true })
  hasEvery?: string[]
  @Field(() => [String], { nullable: true })
  hasSome?: string[]
  @Field(() => Boolean, { nullable: true })
  isEmpty?: boolean
}

@InputType()
export class BoolFilter {
  @Field(() => Boolean, { nullable: true })
  equals?: boolean
  @Field(() => Boolean, { nullable: true })
  not?: boolean
}

// implements Required<Prisma.IntFilter>
@InputType()
export class IntFilter {
  @Field(() => Int, { nullable: true })
  equals?: number
  @Field(() => Int, { nullable: true })
  lt?: number
  @Field(() => Int, { nullable: true })
  lte?: number
  @Field(() => Int, { nullable: true })
  gt?: number
  @Field(() => Int, { nullable: true })
  gte?: number
}

@InputType()
export class FloatFilter {
  @Field(() => Float, { nullable: true })
  equals?: number
  @Field(() => Float, { nullable: true })
  lt?: number
  @Field(() => Float, { nullable: true })
  lte?: number
  @Field(() => Float, { nullable: true })
  gt?: number
  @Field(() => Float, { nullable: true })
  gte?: number
  @Field(() => Float, { nullable: true })
  not?: number
}

registerEnumType(Prisma.SortOrder, {
  name: 'SortOrder',
})

@ObjectType()
export class AggregateCountOutput {
  @Field(() => Int)
  count: number
}

@InputType()
export class LocationFilterInput {
  @Field(() => Float)
  ne_lat: number

  @Field(() => Float)
  ne_lng: number

  @Field(() => Float)
  sw_lat: number

  @Field(() => Float)
  sw_lng: number
}

@ArgsType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  take?: number
  @Field(() => Int, { nullable: true })
  skip?: number
}
