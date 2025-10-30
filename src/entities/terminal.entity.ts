import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Index } from 'typeorm';
import { UserTerminal } from './user-terminal.entity';

@Entity('Terminals')
@Index(['code'], { unique: true })
export class Terminal {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() code: string;

  @OneToMany(() => UserTerminal, ut => ut.terminal) users: UserTerminal[];
}
