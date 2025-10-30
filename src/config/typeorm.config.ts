// src/config/typeorm.config.ts
import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT ?? 1433),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  synchronize: false,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
console.log('[DB CFG]', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
});
