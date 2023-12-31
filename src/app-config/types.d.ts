export type Environment = 'development' | 'production' | 'test';
export interface OAuthConfig {
  audience: string;
  issueDomain: string;
}
export * from './app-config.module';
export * from './app-config.service';
