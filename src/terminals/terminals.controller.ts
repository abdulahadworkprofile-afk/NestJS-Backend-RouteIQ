import { Controller, Get, UseGuards } from '@nestjs/common';
import { TerminalsService } from './terminals.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('terminals')
@UseGuards(JwtAuthGuard)
export class TerminalsController {
  constructor(private terms: TerminalsService) {}
  @Get()
  list() { return this.terms.list(); }
}
