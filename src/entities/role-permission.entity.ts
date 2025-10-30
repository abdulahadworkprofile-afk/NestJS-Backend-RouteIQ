import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('RolePermissions')
@Unique(['role', 'module'])
export class RolePermission {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Role, r => r.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'RoleId' })
  role: Role;

  @Column() module: string; // AppModule
  @Column({ default: true }) canRead: boolean;
  @Column({ default: false }) canWrite: boolean;
}
