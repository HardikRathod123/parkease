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
import { CreateAdmin } from './dtos/create.dto'
import { AdminQueryDto } from './dtos/query.dto'
import { UpdateAdmin } from './dtos/update.dto'
import { AdminEntity } from './entity/admin.entity'

@ApiTags('admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AdminEntity })
  @Post()
  create(@Body() createAdminDto: CreateAdmin, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createAdminDto.uid)
    return this.prisma.admin.create({ data: createAdminDto })
  }

  @ApiOkResponse({ type: [AdminEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: AdminQueryDto) {
    return this.prisma.admin.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: AdminEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.admin.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: AdminEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateAdminDto: UpdateAdmin,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique({ where: { uid } })
    checkRowLevelPermission(user, admin.uid)
    return this.prisma.admin.update({
      where: { uid },
      data: updateAdminDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const admin = await this.prisma.admin.findUnique({ where: { uid } })
    checkRowLevelPermission(user, admin.uid)
    return this.prisma.admin.delete({ where: { uid } })
  }
}
