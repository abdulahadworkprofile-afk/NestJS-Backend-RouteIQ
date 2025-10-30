import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserPermission } from 'src/entities/user-permission.entity';
import { UserTerminal } from 'src/entities/user-terminal.entity';
import { Role } from 'src/entities/role.entity';
import { Terminal } from 'src/entities/terminal.entity';
import { CreateUserDto, ControlLevel } from './dtos/create-user.dto';
 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(UserPermission) private userPermRepo: Repository<UserPermission>,
    @InjectRepository(UserTerminal) private userTermRepo: Repository<UserTerminal>,
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
    @InjectRepository(Terminal) private terminalsRepo: Repository<Terminal>,
  ) {}

  async findByUsernameWithRelations(username: string) {
    return this.usersRepo.findOne({
      where: { username },
      relations: ['role', 'terminals', 'terminals.terminal', 'permissions'],
    });
  }

  async list() {
    return this.usersRepo.find({ relations: ['role', 'terminals', 'terminals.terminal', 'permissions'] });
  }

  async createEmployee(dto: CreateUserDto) {
    const role = await this.rolesRepo.findOne({ where: { code: dto.roleCode } });
    if (!role) throw new NotFoundException('Role not found');

    const existing = await this.usersRepo.findOne({ where: { username: dto.username } });
    if (existing) throw new BadRequestException('Username already exists');

    const hash = await bcrypt.hash(dto.password, 12);
    const user = this.usersRepo.create({
      username: dto.username,
      passwordHash: hash,
      role,
      isActive: dto.isActive ?? true,
      isVendor: false,
    });
    await this.usersRepo.save(user);

    // Terminals
    const terminals = await this.terminalsRepo.find({ where: { code: In(dto.terminalCodes) } });
    if (terminals.length !== dto.terminalCodes.length)
      throw new BadRequestException('One or more terminal codes invalid');

    await this.userTermRepo.save(terminals.map(t =>
      this.userTermRepo.create({ user, terminal: t }),
    ));

    // User permissions (from modules + control)
    const canWrite = dto.control === ControlLevel.READ_WRITE;
    await this.userPermRepo.save(
      dto.modules.map(m => this.userPermRepo.create({
        user, module: m as any, canRead: true, canWrite,
      }))
    );

    return this.usersRepo.findOne({
      where: { id: user.id },
      relations: ['role', 'terminals', 'terminals.terminal', 'permissions'],
    });
  }
}
