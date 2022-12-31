import { useTaskStore } from "@/stores/TaskStore";
import { ErrorMsg } from "@/types/ErrorMsg";
import type { Task } from "@/types/Task";

export const deleteTask = async (id: number) => {
  const taskStore = useTaskStore();
  try {
    const task: Task | undefined = taskStore.tasks.find((t) => t.id === id);
    if (!task) {
      throw new Error(`${ErrorMsg.notInStore} ${id}.`);
    }

    const res = await fetch("http://localhost:3000/tasks/" + id, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(ErrorMsg.deleteTask);

    return task;
  } catch (e: any) {
    console.log(`ERROR: ${e.message}`);
    return null;
  }
};
