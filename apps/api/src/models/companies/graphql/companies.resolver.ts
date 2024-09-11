import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CompaniesService } from './companies.service'
import { CreateCompanyInput } from './dtos/create-company.input'
import { FindManyCompanyArgs, FindUniqueCompanyArgs } from './dtos/find.args'
import { UpdateCompanyInput } from './dtos/update-company.input'
import { Company } from './entity/company.entity'

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('manager')
  @Mutation(() => Company)
  createCompany(@Args('createCompanyInput') args: CreateCompanyInput) {
    return this.companiesService.create(args)
  }

  @Query(() => [Company], { name: 'companies' })
  findAll(@Args() args: FindManyCompanyArgs) {
    return this.companiesService.findAll(args)
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args() args: FindUniqueCompanyArgs) {
    return this.companiesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Company)
  async updateCompany(
    @Args('updateCompanyInput') args: UpdateCompanyInput,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findUnique({
      where: { id: args.id },
      include: { Managers: true },
    })
    checkRowLevelPermission(
      user,
      company.Managers.map((man) => man.uid),
    )
    return this.companiesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Company)
  async removeCompany(
    @Args() args: FindUniqueCompanyArgs,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findUnique({
      ...args,
      include: { Managers: true },
    })
    checkRowLevelPermission(
      user,
      company.Managers.map((man) => man.uid),
    )
    return this.companiesService.remove(args)
  }
}
