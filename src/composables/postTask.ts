import { ErrorMsg } from "@/types/ErrorMsg";
import type { Task } from "@/types/Task";

export const postTask = async (newTask: Task) => {
  try {
    const res = await fetch("http://localhost:3000/tasks/", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(ErrorMsg.postTask);

    return newTask;
  } catch (e: any) {
    console.log(`ERROR: ${e.message}`);
    return null;
  }
};
