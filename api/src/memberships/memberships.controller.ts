import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto.js';
import { UpdateMembershipDto } from './dto/update-membership.dto.js';
import type {
  Membership,
  MembershipStatus,
  MembershipWithUser,
} from './entities/membership.entity.js';
import { MembershipsService } from './memberships.service.js';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get()
  findAll(
    @Query('_expand') expand?: string,
    @Query('userId') userId?: string,
    @Query('membershipCode') membershipCode?: string,
    @Query('status') status?: MembershipStatus,
    @Query('_page') page?: string,
    @Query('_limit') limit?: string,
  ): MembershipWithUser[] {
    return this.membershipsService.findAll({
      expand,
      userId,
      membershipCode,
      status,
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('_expand') expand?: string,
  ): MembershipWithUser {
    return this.membershipsService.findOne(id, expand);
  }

  @Post()
  create(@Body() createMembershipDto: CreateMembershipDto): Membership {
    return this.membershipsService.create(createMembershipDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ): Membership {
    return this.membershipsService.update(id, updateMembershipDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.membershipsService.remove(id);
  }
}
