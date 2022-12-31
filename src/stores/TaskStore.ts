import { defineStore } from "pinia";
import type { Task } from "@/types/Task";
import { fetchTasks } from "@/composables/fetchTasks";

type State = {
  tasks: Task[];
  isLoading: boolean;
  errorMsg: null | string;
};

export const useTaskStore = defineStore("taskStore", {
  state: (): State => {
    return {
      tasks: [],
      isLoading: false,
      errorMsg: null,
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
    getTasks() {
      fetchTasks();
    },

    async addTask(task: Task) {
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
