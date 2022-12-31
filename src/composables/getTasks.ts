import { useTaskStore } from "@/stores/TaskStore";
import type { Task } from "@/types/Task";
import { ErrorMsg } from "@/types/ErrorMsg";

export const getTasks = async () => {
  const taskStore = useTaskStore();

  taskStore.isLoading = true;
  taskStore.errorMsg = null;
  // setTimeout is here just for demonstration
  setTimeout(async () => {
    try {
      let res = await fetch("http://localhost:3000/tasks/");
      if (!res.ok) throw new Error(ErrorMsg.noData);
      const data: Task[] = await res.json();
      taskStore.tasks = data;
    } catch (e: any) {
      console.log(`ERROR: ${e.message}`);
      taskStore.errorMsg = e.message;
    } finally {
      taskStore.isLoading = false;
    }
  }, 1500);
};
