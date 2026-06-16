import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load environment variables if you use an .env file
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST ?? 'localhost',
  port: parseInt(process.env.DB_POSTGRES_PORT || '5432'),
  username: process.env.DB_POSTGRES_USERNAME || 'postgres',
  password: process.env.DB_POSTGRES_PASSWORD || 'password',
  database: process.env.DB_POSTGRES_NAME || 'test',
});

async function testConnection() {
  try {
    console.log('🔄 Connecting to the database...');
    await AppDataSource.initialize();
    console.log('✅ Connection successful!');
    
    // Optional: Run a simple query to verify communication
    const result = await AppDataSource.query('SELECT NOW()');
    console.log('📊 Server time:', result[0]);
    
    await AppDataSource.destroy();
  } catch (error) {
    if (error instanceof Error) {
        console.error('❌ Connection failed:', error.message);
    }
        // 2. Check if it's a TypeORM QueryFailedError to get specific DB codes
    else if (error && typeof error === 'object' && 'code' in error) {
        console.error("Database Error Code:", (error as any).code);
    } else {
        console.error("Unknown error:", error);
    }
    
    process.exit(1);
  }
}

testConnection();