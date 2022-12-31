import { useTaskStore } from "@/stores/TaskStore";
import { ref } from "vue";

export const fetchTasks = async () => {
  const taskStore = useTaskStore();

  taskStore.isLoading = true;
  taskStore.errorMsg = null;
  // setTimeout is here just for demonstration
  setTimeout(async () => {
    try {
      let res = await fetch("http://localhost:3000/tasks/");
      if (!res.ok) throw new Error("Error: no data available");
      const data: Task[] = await res.json();
      taskStore.tasks = data;
    } catch (e: any) {
      taskStore.errorMsg = e.message;
    } finally {
      taskStore.isLoading = false;
    }
  }, 1500);
};
