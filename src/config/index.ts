import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { databaseConfig } from './database.config';

interface iConfig {
  env?: string;
  port: number;
  appPrefix: string;
  swaggerPrefix: string;
  jwtSecretKey: string;
  database: PostgresConnectionOptions;
  keys: {
    salaryHeroKey: string;
  };
}

export default (): Partial<iConfig> => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  appPrefix: 'api',
  swaggerPrefix: 'api',
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  database: databaseConfig(),
  keys: {
    salaryHeroKey: process.env.SALARY_HERO_KEY,
  },
});
