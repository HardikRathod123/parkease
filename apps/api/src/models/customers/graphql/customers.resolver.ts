import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CustomersService } from './customers.service'
import { CreateCustomerInput } from './dtos/create-customer.input'
import { FindManyCustomerArgs, FindUniqueCustomerArgs } from './dtos/find.args'
import { UpdateCustomerInput } from './dtos/update-customer.input'
import { Customer } from './entity/customer.entity'

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private readonly customersService: CustomersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Customer)
  createCustomer(
    @Args('createCustomerInput') args: CreateCustomerInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.customersService.create(args)
  }

  @Query(() => [Customer], { name: 'customers' })
  findAll(@Args() args: FindManyCustomerArgs) {
    return this.customersService.findAll(args)
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args() args: FindUniqueCustomerArgs) {
    return this.customersService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Customer)
  async updateCustomer(
    @Args('updateCustomerInput') args: UpdateCustomerInput,
    @GetUser() user: GetUserType,
  ) {
    const customer = await this.prisma.customer.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, customer.uid)
    return this.customersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Customer)
  async removeCustomer(
    @Args() args: FindUniqueCustomerArgs,
    @GetUser() user: GetUserType,
  ) {
    const customer = await this.prisma.customer.findUnique(args)
    checkRowLevelPermission(user, customer.uid)
    return this.customersService.remove(args)
  }
}
