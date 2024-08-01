import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);
