const path = require('path');
// Initialize dotenv before utilizing any process.env variables
const result = require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

if (result.error) {
  console.error("Dotenv Error:", result.error);
} else {
  console.log("Dotenv Parsed Successfully:");
}

import { DataSource, DataSourceOptions } from 'typeorm';

export const pgDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: Number(process.env.DB_POSTGRES_PORT),
  username: process.env.DB_POSTGRES_USER,
  password: String(process.env.DB_POSTGRES_PASSWORD),
  database: process.env.DB_POSTGRES_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
  migrationsRun: false,
  synchronize: process.env.ENV !== 'production',
  logging: process.env.ENV !== 'production',
  extra: {
    connectionLimit: 10, // Adjust based on your database connection pool requirements
  },
};

const pgDataSource = new DataSource(pgDataSourceOptions);

pgDataSource.initialize()

export default pgDataSource;
