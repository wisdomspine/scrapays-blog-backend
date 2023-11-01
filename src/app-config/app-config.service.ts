import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './types';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return Number.parseInt(this.configService.get<string>('PORT'), 10);
  }

  get environment(): Environment {
    const enviroment = this.configService.get<Environment>('ENVIRONMENT');
    const environments = ['development', 'production', 'test'];
    return environments.includes(enviroment) ? enviroment : 'development';
  }
}
