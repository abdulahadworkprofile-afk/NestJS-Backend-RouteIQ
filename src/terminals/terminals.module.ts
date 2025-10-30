import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Terminal } from 'src/entities/terminal.entity';
import { TerminalsService } from './terminals.service';
import { TerminalsController } from './terminals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Terminal])],
  providers: [TerminalsService],
  controllers: [TerminalsController],
  exports: [TerminalsService],
})
export class TerminalsModule {}
