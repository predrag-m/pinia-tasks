import { defineStore } from "pinia";
import type { Task } from "@/types/Task";

type State = {
  tasks: Task[];
};

export const useTaskStore = defineStore("taskStore", {
  state: (): State => {
    return {
      tasks: [
        { id: 1, title: "buy some milk", isFav: false },
        { id: 2, title: "buy dog food", isFav: false },
        { id: 3, title: "play Gloomhaven", isFav: true },
      ],
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
