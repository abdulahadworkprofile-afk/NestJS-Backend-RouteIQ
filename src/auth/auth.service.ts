import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validate(username: string, password: string) {
    const user = await this.users.findByUsernameWithRelations(username);
    console.log('Found user:', user); 
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    console.log('Password match:', ok);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(username: string, password: string) {
    const u = await this.validate(username, password);
    const payload = {
      sub: u.id,
      username: u.username,
      role: u.role.code,
      isVendor: u.isVendor,
      terminals: (u.terminals ?? []).map(t => t.terminal.code),
    };
    return { access_token: this.jwt.sign(payload) };
  }
}
