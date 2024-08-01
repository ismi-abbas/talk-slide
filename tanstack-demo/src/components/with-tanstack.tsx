import { useQuery } from "@tanstack/react-query";
import { SelectTask } from "@server/src/db/schema";

export default function PriorityWithTanstack({
  priority,
}: {
  priority: string;
}) {
  const query = useQuery({
    queryKey: ["tasks", priority],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks/" + priority);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        return result as SelectTask[];
      } catch (error) {
        throw new Error("Failed to fetch tasks " + error);
      }
    },
    retry: 1,
    staleTime: 3 * 60 * 1000,
  });

  return (
    <>
      <div className="flex items-center justify-center mt-4">
        {query.isLoading && (
          <div className="w-12 h-12 rounded-full animate-spin border-4 border-yellow-500 border-t-transparent"></div>
        )}
        {query.error && <div>Error: {query.error.message}</div>}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {query.data?.map((task) => (
          <div
            key={task.taskId}
            className="flex p-3 flex-col rounded-md border"
          >
            <div>{task.taskId}</div>
            <div>{task.taskName}</div>
            <div
              className={`${
                task.priority === "High"
                  ? "text-red-500"
                  : task.priority === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
              }`}
            >
              {task.priority}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
