import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres', // important
  host: config.get<string>('DATABASE_HOST'),
  port: Number(config.get<string>('DATABASE_PORT')),
  username: config.get<string>('DATABASE_USER'),
  password: config.get<string>('DATABASE_PASSWORD'),
  database: config.get<string>('DATABASE_NAME'),
  autoLoadEntities: true,
  synchronize: true,
});