/**
 * This loads database configuration from the environment
 * NOTE: Using a separate db-config allows me to use the same configuration in both
 * NestJS runtime, and typeorm environment. This is especially useful for migrations
 */

import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'app_migration',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.SYNCHRONIZE_DB === 'true',
  migrationsRun: process.env.RUN_DB_MIGRATIONS === 'true',
  database: 'app_db.sqlite',
};
/**
 * configuration function to be used in NestJS
 * @returns configuration object for ConfigService. The key is DB
 */
export const configLoader = () => ({ DB: config });

/**
 * default datasource of config object for the typeorm environment.
 * This can be used in migrations
 */
export default new DataSource(config as SqliteConnectionOptions);
