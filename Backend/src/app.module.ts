import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';  
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { databaseConfig } from './config/database.config';
import { EnseignantModule } from './modules/enseignant/enseignant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    EnseignantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
