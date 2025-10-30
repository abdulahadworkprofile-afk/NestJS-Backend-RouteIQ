import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Index } from 'typeorm';
import { RolePermission } from './role-permission.entity';
import { User } from './user.entity';

@Entity('Roles')
@Index(['code'], { unique: true })
export class Role {
  @PrimaryGeneratedColumn() id: number;
  @Column() code: string;
  @Column() name: string;
  @Column({ default: false }) isSystem: boolean;

  @OneToMany(() => RolePermission, rp => rp.role) permissions: RolePermission[];
  @OneToMany(() => User, u => u.role) users: User[];
}
