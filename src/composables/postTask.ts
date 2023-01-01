import type { Task } from "@/types/Task";
import { ErrorMsg } from "@/types/ErrorMsg";
import { DataBase } from "@/types/DataBase";

export async function postTask(task: Task): Promise<boolean> {
  try {
    const res = await fetch(DataBase.tasksURL, {
      method: "Post",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(ErrorMsg.postTask);
    return true;
  } catch (e: any) {
    console.log(e.message);
    return false;
  }
}
