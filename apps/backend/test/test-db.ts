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

async function testConnection() {
  console.log('🔄 Attempting to connect to PostgreSQL via TypeORM');

  try {
    // Establish database connection
    await AppDataSource.initialize();
    console.log('✅ Connection successfully established!');

    // Execute a quick raw SQL query to verify data integrity
    const result = await AppDataSource.query('SELECT NOW() as current_time');
    console.log('🕒 Database server time:', result[0].current_time);
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

testConnection();
