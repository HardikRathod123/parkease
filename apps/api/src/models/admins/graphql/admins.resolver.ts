import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { AdminsService } from './admins.service'
import { CreateAdminInput } from './dtos/create-admin.input'
import { FindManyAdminArgs, FindUniqueAdminArgs } from './dtos/find.args'
import { UpdateAdminInput } from './dtos/update-admin.input'
import { Admin } from './entity/admin.entity'

@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Admin)
  createAdmin(
    @Args('createAdminInput') args: CreateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.adminsService.create(args)
  }

  @Query(() => [Admin], { name: 'admins' })
  findAll(@Args() args: FindManyAdminArgs) {
    return this.adminsService.findAll(args)
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args() args: FindUniqueAdminArgs) {
    return this.adminsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Admin)
  async updateAdmin(
    @Args('updateAdminInput') args: UpdateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, admin.uid)
    return this.adminsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Admin)
  async removeAdmin(
    @Args() args: FindUniqueAdminArgs,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique(args)
    checkRowLevelPermission(user, admin.uid)
    return this.adminsService.remove(args)
  }
}
