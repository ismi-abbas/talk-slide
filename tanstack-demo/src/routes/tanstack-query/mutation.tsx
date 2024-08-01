import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { InsertTask } from "@server/src/db/schema";
import { useState } from "react";
import { fetchTasksOptions } from "../../queries";

type NewTask = Omit<InsertTask, "taskId">;

export default function MutationSample() {
  const [task, setTask] = useState<NewTask>({});

  const handleTaskChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof NewTask
  ) => {
    setTask((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const { data, status, error, isFetching, isRefetching } = useQuery(
    fetchTasksOptions("Medium")
  );

  const { mutateAsync } = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (task: NewTask) => {
      try {
        ``;
        const response = await fetch("http://localhost:3000/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return await response.json();
      } catch (error) {
        throw new Error("Failed to add task " + error);
      }
    },
  });

  const handleAddTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    mutateAsync({
      taskName: "Task 1",
      priority: "High",
      description: "This is a description",
      status: "Not Started",
    });
  };

  return (
    <div className="flex flex-col mt-4">
      <h1 className="text-3xl font-bold">Sample Using useMutation</h1>

      {status === "pending" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {isFetching ? <div>Refreshing...</div> : null}
          {isRefetching ? <div>Refetching...</div> : null}
          <div>
            {data.map((todo) => (
              <div key={todo.taskId}>
                {todo.taskName} - {todo.priority}
              </div>
            ))}
          </div>
        </>
      )}

      {data && (
        <ul>
          {data.map((task, index) => (
            <li key={index}>
              {task.taskName} - {task.priority}
            </li>
          ))}
        </ul>
      )}

      <form action="">
        <div className="mt-4 flex gap-4">
          <input
            type="text"
            placeholder="Enter a task"
            className="border p-2"
            value={task.taskName || ""}
            onChange={(e) => handleTaskChange(e, "taskName")}
          />
          <input
            type="text"
            placeholder="Enter a task"
            className="border p-2"
            value={task.description || ""}
            onChange={(e) => handleTaskChange(e, "description")}
          />
          <select
            className="border p-2"
            value={task.priority || ""}
            onChange={(e) => {
              setTask((prev) => ({
                ...prev,
                priority: e.target.value,
              }));
            }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button className="border p-2" onClick={(e) => handleAddTask(e)}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export const Route = createFileRoute("/tanstack-query/mutation")({
  component: MutationSample,
});
