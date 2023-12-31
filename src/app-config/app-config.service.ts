import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment, OAuthConfig } from './types';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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

  get db(): TypeOrmModuleOptions {
    return this.configService.get<TypeOrmModuleOptions>('DB');
  }

  get oauth0(): OAuthConfig {
    return {
      audience: this.configService.get<string>('AUDIENCE'),
      issueDomain: this.configService.get<string>('ISSUER_BASE_URL'),
    };
  }
}
