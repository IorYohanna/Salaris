import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private dataSource: DataSource) {}

  async testDb(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1');
      return 'DB connected';
    } catch (error) {
      console.error(error);
      return 'DB connection failed';
    }
  }
}
