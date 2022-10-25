import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { databaseConfig } from './database.config';

interface iConfig {
  env?: string;
  port: number;
  appPrefix: string;
  swaggerPrefix: string;
  database: PostgresConnectionOptions;
}

export default (): Partial<iConfig> => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  appPrefix: 'api',
  swaggerPrefix: 'api',
  database: databaseConfig(),
});
