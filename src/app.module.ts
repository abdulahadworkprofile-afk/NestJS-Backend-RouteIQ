import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.100.35',
      port: 1433,            
      username: 'RouteIQUser',
      password: 'password123',
      database: 'routeIQ_2025',
      entities: [],
      synchronize: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
  ],
})
export class AppModule {}
