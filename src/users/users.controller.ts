import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { VendorGuard } from '../common/guards/vendor.guard';

@Controller('vendor/users')
@UseGuards(JwtAuthGuard, VendorGuard) // vendor-only endpoints
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  list() { return this.users.list(); }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.users.createEmployee(dto);
  }
}
