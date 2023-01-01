import { useTasksStore } from "@/stores/TasksStore";
import type { Task } from "@/types/Task";
import { ErrorMsg } from "@/types/ErrorMsg";
import { DataBase } from "@/types/DataBase";

export async function patchIsFavTask(id: number) {
  const tasksStore = useTasksStore();
  try {
    const task: Task | undefined = tasksStore.tasks.find((t) => t.id === id);
    if (!task) throw new Error(`${ErrorMsg.notInStore} ${id}`);

    const isFavNewValue = !task.isFav;
    const res = await fetch(`${DataBase.tasksURL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isFav: isFavNewValue }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(ErrorMsg.patchTask);
    return task;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
}
