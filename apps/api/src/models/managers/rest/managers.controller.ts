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
import { CreateManager } from './dtos/create.dto'
import { ManagerQueryDto } from './dtos/query.dto'
import { UpdateManager } from './dtos/update.dto'
import { ManagerEntity } from './entity/manager.entity'

@ApiTags('managers')
@Controller('managers')
export class ManagersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ManagerEntity })
  @Post()
  create(
    @Body() createManagerDto: CreateManager,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createManagerDto.uid)
    return this.prisma.manager.create({ data: createManagerDto })
  }

  @ApiOkResponse({ type: [ManagerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ManagerQueryDto) {
    return this.prisma.manager.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ManagerEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.manager.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: ManagerEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateManagerDto: UpdateManager,
    @GetUser() user: GetUserType,
  ) {
    const manager = await this.prisma.manager.findUnique({ where: { uid } })
    checkRowLevelPermission(user, manager.uid)
    return this.prisma.manager.update({
      where: { uid },
      data: updateManagerDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const manager = await this.prisma.manager.findUnique({ where: { uid } })
    checkRowLevelPermission(user, manager.uid)
    return this.prisma.manager.delete({ where: { uid } })
  }
}
