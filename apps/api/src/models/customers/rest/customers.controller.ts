import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CreateCustomer } from './dtos/create.dto'
import { CustomerQueryDto } from './dtos/query.dto'
import { UpdateCustomer } from './dtos/update.dto'
import { CustomerEntity } from './entity/customer.entity'

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CustomerEntity })
  @Post()
  create(
    @Body() createCustomerDto: CreateCustomer,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createCustomerDto.uid)
    return this.prisma.customer.create({ data: createCustomerDto })
  }

  @ApiOkResponse({ type: [CustomerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: CustomerQueryDto) {
    return this.prisma.customer.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: CustomerEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.customer.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: CustomerEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateCustomerDto: UpdateCustomer,
    @GetUser() user: GetUserType,
  ) {
    const customer = await this.prisma.customer.findUnique({ where: { uid } })
    checkRowLevelPermission(user, customer.uid)
    return this.prisma.customer.update({
      where: { uid },
      data: updateCustomerDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const customer = await this.prisma.customer.findUnique({ where: { uid } })
    checkRowLevelPermission(user, customer.uid)
    return this.prisma.customer.delete({ where: { uid } })
  }
}
