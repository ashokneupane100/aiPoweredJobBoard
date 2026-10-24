import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/data/env/server";

const globalForPostgres = globalThis as typeof globalThis & {
  postgresPool?: Pool;
};

const pool =
  globalForPostgres.postgresPool ??
  new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPostgres.postgresPool = pool;
}

export const db = drizzle(pool);
