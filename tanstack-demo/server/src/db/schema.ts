import { text, integer, pgTable } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  taskId: integer("task_id").primaryKey(),
  taskName: text("task_name"),
  description: text("description"),
  priority: text("priority"),
  status: text("status"),
});

export type InsertTask = typeof tasks.$inferInsert;
export type SelectTask = typeof tasks.$inferSelect;
