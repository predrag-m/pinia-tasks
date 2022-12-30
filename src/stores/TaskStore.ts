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
        { id: 2, title: "play Gloomhaven", isFav: true },
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

    deleteTask() {},

    changeTaskToFavTask() {},
  },
});
