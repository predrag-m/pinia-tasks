import type { Task } from "@/types/Task";

export class TaskModel implements Task {
  id: number = Math.floor(Math.random() * 10000 + Math.random() * 10000);
  constructor(public title: string, public isFav: boolean = false) {}
}
