import { SelectTask } from "@server/src/db/schema";
import { queryOptions } from "@tanstack/react-query";

async function fetchGroups(priority: string): Promise<SelectTask[]> {
  try {
    const res = await fetch("http://localhost:3000/tasks/" + priority);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return await res.json();
  } catch {
    throw new Error("Failed to fetch tasks");
  }
}
export const fetchTasksOptions = (priority: string) => {
  return queryOptions({
    queryKey: ["tasks", priority],
    queryFn: () => fetchGroups(priority),
    staleTime: 5 * 1000,
  });
};
