import { defineStore } from "pinia";
import type { Task } from "@/types/Task";

type State = {
  tasks: Task[];
  isLoading: boolean;
};

export const useTaskStore = defineStore("taskStore", {
  state: (): State => {
    return {
      tasks: [],
      isLoading: false,
    };
  },

  getters: {
    favTasks: (state: State): Task[] =>
      state.tasks.filter((task) => task.isFav),

    favTasksCount: (state: State) =>
      state.tasks.reduce((num, task) => (task.isFav ? num + 1 : num), 0),

    allTasksCount: (state: State) => state.tasks.length,
  },

  actions: {
    async getTasks() {
      this.isLoading = true;
      setTimeout(async () => {
        const res = await fetch("http://localhost:3000/tasks/");
        const data: Task[] = await res.json();

        this.tasks = data;
        this.isLoading = false;
      }, 1500);
    },
    addTask(task: Task) {
      this.tasks.push(task);
    },

    deleteTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    toggleFavTask(id: number) {
      const task: Task | undefined = this.tasks.find((t) => t.id === id);
      if (task) task.isFav = !task.isFav;
    },
  },
});
