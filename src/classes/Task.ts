import type { Task as TaskType } from "@/types/Task";

export class Task implements TaskType {
  id: number = Math.floor(Math.random() * 10000);
  title: string;
  isFav: boolean;

  constructor(title: string, isFav: boolean = false) {
    this.title = title;
    this.isFav = isFav;
  }
}
