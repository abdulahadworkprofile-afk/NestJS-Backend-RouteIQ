import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string|| 'supersecret', // ✅ make sure it's always a string
    });
  }

  async validate(payload: any) {
    // This gets attached to req.user
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      isVendor: payload.isVendor,
      terminals: payload.terminals,
    };
  }
}
