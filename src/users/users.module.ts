import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/entities/user.entity';
import { UserPermission } from 'src/entities/user-permission.entity';
import { UserTerminal } from 'src/entities/user-terminal.entity';
import { Role } from 'src/entities/role.entity';
import { Terminal } from 'src/entities/terminal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPermission, UserTerminal, Role, Terminal])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
