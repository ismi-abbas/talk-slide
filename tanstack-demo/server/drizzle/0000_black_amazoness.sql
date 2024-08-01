CREATE TABLE IF NOT EXISTS "tasks" (
	"task_id" integer PRIMARY KEY NOT NULL,
	"task_name" text,
	"description" text,
	"priority" text,
	"status" text
);
