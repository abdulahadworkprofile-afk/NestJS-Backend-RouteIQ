import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Terminal } from 'src/entities/terminal.entity';

@Injectable()
export class TerminalsService {
  constructor(@InjectRepository(Terminal) private termRepo: Repository<Terminal>) {}
  list() { return this.termRepo.find(); }
}
