import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.100.35',
      port: 1433,
      username: 'RouteIQUser',
      password: 'password123',
      database: 'routeIQ_2025',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: { encrypt: false, trustServerCertificate: true },
    }),
    UsersModule,
  ],
  providers: [UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}
