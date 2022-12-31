import { defineStore } from "pinia";
import type { Task } from "@/types/Task";
import { getTasks } from "@/composables/getTasks";
import { postTask } from "@/composables/postTask";
import { deleteTask } from "@/composables/deleteTask";
import { patchIsFavTask } from "@/composables/patchIsFavTask";

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
    fetchTasks: () => getTasks(),

    async addTask(newTask: Task) {
      const addedTask: Task | null = await postTask(newTask);
      if (!addedTask) return;
      this.tasks.push(addedTask);
    },

    async removeTask(id: number) {
      const task: Task | null = await deleteTask(id);
      if (!task) return;
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    async toggleFavTask(id: number) {
      const task: Task | null = await patchIsFavTask(id);
      if (!task) return;
      task.isFav = !task.isFav;
    },
  },
});
