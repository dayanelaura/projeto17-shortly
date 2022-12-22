import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'shortly',
});
/* 
const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});
 */
export default connection;