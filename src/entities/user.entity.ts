import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { UserPermission } from './user-permission.entity';
import { UserTerminal } from './user-terminal.entity';

@Entity('Users')
@Index(['username'], { unique: true })
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() username: string;
  @Column() passwordHash: string;

  @ManyToOne(() => Role, r => r.users, { eager: true })
  @JoinColumn({ name: 'RoleId' })
  role: Role;

  @Column({ default: false }) isVendor: boolean;
  @Column({ default: true }) isActive: boolean;
  @Column({ type: 'datetime2', default: () => 'SYSUTCDATETIME()' }) createdAt: Date;

  @OneToMany(() => UserPermission, up => up.user) permissions: UserPermission[];
  @OneToMany(() => UserTerminal, ut => ut.user) terminals: UserTerminal[];
}
