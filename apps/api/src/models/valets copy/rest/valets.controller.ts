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
import { CreateValet } from './dtos/create.dto'
import { ValetQueryDto } from './dtos/query.dto'
import { UpdateValet } from './dtos/update.dto'
import { ValetEntity } from './entity/valet.entity'

@ApiTags('valets')
@Controller('valets')
export class ValetsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ValetEntity })
  @Post()
  create(@Body() createValetDto: CreateValet, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createValetDto.uid)
    return this.prisma.valet.create({ data: createValetDto })
  }

  @ApiOkResponse({ type: [ValetEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ValetQueryDto) {
    return this.prisma.valet.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ValetEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.valet.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: ValetEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateValetDto: UpdateValet,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique({ where: { uid } })
    checkRowLevelPermission(user, valet.uid)
    return this.prisma.valet.update({
      where: { uid },
      data: updateValetDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const valet = await this.prisma.valet.findUnique({ where: { uid } })
    checkRowLevelPermission(user, valet.uid)
    return this.prisma.valet.delete({ where: { uid } })
  }
}
