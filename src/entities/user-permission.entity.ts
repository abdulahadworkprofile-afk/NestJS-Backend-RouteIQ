import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('UserPermissions')
@Unique(['user', 'module'])
export class UserPermission {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, u => u.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserId' })
  user: User;

  @Column() module: string; // AppModule
  @Column({ default: true }) canRead: boolean;
  @Column({ default: false }) canWrite: boolean;
}
