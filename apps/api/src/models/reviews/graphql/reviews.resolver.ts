import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CreateReviewInput } from './dtos/create-review.input'
import { FindManyReviewArgs, FindUniqueReviewArgs } from './dtos/find.args'
import { UpdateReviewInput } from './dtos/update-review.input'
import { Review } from './entity/review.entity'
import { ReviewsService } from './reviews.service'

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') args: CreateReviewInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId)
    return this.reviewsService.create(args)
  }

  @Query(() => [Review], { name: 'reviews' })
  findAll(@Args() args: FindManyReviewArgs) {
    return this.reviewsService.findAll(args)
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args() args: FindUniqueReviewArgs) {
    return this.reviewsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Review)
  async updateReview(
    @Args('updateReviewInput') args: UpdateReviewInput,
    @GetUser() user: GetUserType,
  ) {
    const review = await this.prisma.review.findUnique({
      where: { id: args.id },
    })
    checkRowLevelPermission(user, review.customerId)
    return this.reviewsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Review)
  async removeReview(
    @Args() args: FindUniqueReviewArgs,
    @GetUser() user: GetUserType,
  ) {
    const review = await this.prisma.review.findUnique(args)
    checkRowLevelPermission(user, review.customerId)
    return this.reviewsService.remove(args)
  }
}
