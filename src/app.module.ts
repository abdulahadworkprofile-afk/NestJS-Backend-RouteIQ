import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TerminalsModule } from './terminals/terminals.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true , envFilePath: ['.env']}),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    RolesModule,
    TerminalsModule
  ],
})
export class AppModule {}
