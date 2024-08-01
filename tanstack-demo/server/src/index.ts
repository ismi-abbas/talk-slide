import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { db } from "./db";
import { InsertTask, tasks } from "./db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { cors } from "hono/cors";

const app = new Hono();
app.use(
  "*",
  cors({
    origin: "*",
  })
);

app.get("/", (c) => c.text("Hello Hono!"));

app
  .get("/tasks", async (c) => {
    // make it slower
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const allTasks = await db.select().from(tasks);

    return c.json(allTasks);
  })
  .get("/tasks/:priority", async (c) => {
    const priority = c.req.param("priority");
    if (priority === "High") {
      throw new Error("Server Error");
    }
    // make it slower
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const allTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.priority, priority))
      .orderBy(desc(tasks.taskId));

    return c.json(allTasks);
  })
  .post("/task", async (c) => {
    try {
      const task = (await c.req.json()) as InsertTask;

      const newTask = await db.insert(tasks).values({
        ...task,
        taskId: Math.floor(Math.random() * 9000) + 1000,
      });

      console.log(newTask);

      return c.json(newTask);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to add task" });
    }
  });

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
