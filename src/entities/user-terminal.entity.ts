import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Terminal } from './terminal.entity';

@Entity('UserTerminals')
@Unique(['user', 'terminal'])
export class UserTerminal {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, u => u.terminals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserId' })
  user: User;

  @ManyToOne(() => Terminal, t => t.users, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'TerminalId' })
  terminal: Terminal;
}
