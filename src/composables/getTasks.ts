import { useTasksStore } from "@/stores/TasksStore";
import type { Task } from "@/types/Task";
import { ErrorMsg } from "@/types/ErrorMsg";
import { DataBase } from "@/types/DataBase";

export const getTasks = async () => {
  const tasksStore = useTasksStore();
  tasksStore.isLoading = true;
  tasksStore.errorMsg = null;

  setTimeout(async () => {
    try {
      const res = await fetch(DataBase.tasksURL);
      if (!res.ok) throw new Error(ErrorMsg.getTasks);
      const data: Task[] = await res.json();
      tasksStore.tasks = data;
    } catch (e: any) {
      tasksStore.errorMsg = e.message;
      console.log(e.message);
    } finally {
      tasksStore.isLoading = false;
    }
  }, 1500);
};
