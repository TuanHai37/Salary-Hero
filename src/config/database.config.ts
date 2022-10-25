import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseConfig = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: false,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  synchronize: true,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
  migrations: [join(__dirname, '../database/migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: join(__dirname, '../database/migrations'),
    entitiesDir: join(__dirname, '../**/*.entity{.ts,.js}'),
  },
});

export default databaseConfig();
