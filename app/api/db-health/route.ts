import { sql } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/src/db";

export async function GET() {
  await connection();

  try {
    await db.execute(sql`select 1`);
    return Response.json({ database: "connected" });
  } catch (error) {
    console.error("Database health check failed", error);
    return Response.json({ database: "disconnected" }, { status: 503 });
  }
}
