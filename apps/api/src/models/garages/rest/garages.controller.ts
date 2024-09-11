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
import { CreateGarage } from './dtos/create.dto'
import { GarageQueryDto } from './dtos/query.dto'
import { UpdateGarage } from './dtos/update.dto'
import { GarageEntity } from './entity/garage.entity'

@ApiTags('garages')
@Controller('garages')
export class GaragesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: GarageEntity })
  @Post()
  async create(
    @Body() createGarageDto: CreateGarage,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findUnique({
      where: { id: createGarageDto.companyId },
      include: { Managers: true },
    })
    checkRowLevelPermission(
      user,
      company.Managers.map((manager) => manager.uid),
    )
    return this.prisma.garage.create({ data: createGarageDto })
  }

  @ApiOkResponse({ type: [GarageEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: GarageQueryDto) {
    return this.prisma.garage.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: GarageEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.garage.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: GarageEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGarageDto: UpdateGarage,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.garage.findUnique({
      where: { id },
      include: { Company: { include: { Managers: true } } },
    })
    checkRowLevelPermission(
      user,
      garage.Company.Managers.map((manager) => manager.uid),
    )
    return this.prisma.garage.update({
      where: { id },
      data: updateGarageDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const garage = await this.prisma.garage.findUnique({
      where: { id },
      include: { Company: { include: { Managers: true } } },
    })
    checkRowLevelPermission(
      user,
      garage.Company.Managers.map((manager) => manager.uid),
    )
    return this.prisma.garage.delete({ where: { id } })
  }
}
