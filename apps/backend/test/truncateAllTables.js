import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

// Load environment variables from .env file
dotenv.config();

// Define database connection credentials
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_TEST_HOST || 'localhost',
  port: parseInt(process.env.DB_TEST_PORT || '5433', 10),
  username: process.env.DB_TEST_USERNAME || 'test_user',
  password: process.env.DB_TEST_PASSWORD || 'test_pwd',
  database: process.env.DB_TEST_DATABASE || 'test_db',
  synchronize: false, // Always false for manual connection testing
  logging: true,
});

async function truncateAllTables() {
  console.log('🔄 Attempting to connect to PostgreSQL via TypeORM');

  try {
    // Establish database connection
    await AppDataSource.initialize();
    console.log('✅ Connection successfully established!');

    // Execute the truncate statement
    const query = `
      SELECT 'TRUNCATE TABLE ' || string_agg('"' || tablename || '"', ', ') || ' RESTART IDENTITY CASCADE;' as truncate_command
      FROM pg_tables
      WHERE schemaname = 'public';
    `;

    const res = await AppDataSource.query(query);
    const truncateCommand = res.rows[0]?.truncate_command;

    if (truncateCommand) {
      await AppDataSource.query(truncateCommand);
    }

    console.log('🕒 All Tables successfully truncated');
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error(error);
  } finally {
    // Terminate connection pool safely
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('🔌 Connection closed.');
    }
  }
}

truncateAllTables();