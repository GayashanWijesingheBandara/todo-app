





import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = new Pool({
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 5432,
  user: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  database: process.env.DATABASE_NAME || "tododb",
});

// Test connection
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL database");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed", err);
    process.exit(1);
  });

export default pool;
