import { getTasks } from "@/composables/getTasks";
import { postTask } from "@/composables/postTask";
import { deleteTask } from "@/composables/deleteTask";
import type { Task } from "@/types/Task";
import { defineStore } from "pinia";
import { patchIsFavTask } from "@/composables/patchIsFavTask";

type State = {
  tasks: Task[];
  isLoading: boolean;
  errorMsg: null | string;
};

export const useTasksStore = defineStore("tasksStore", {
  state: (): State => {
    return {
      tasks: [],
      isLoading: false,
      errorMsg: null,
    };
  },

  getters: {
    favTasks: (s: State) => s.tasks.filter((t) => t.isFav),

    favTasksCount: (s: State) =>
      s.tasks.reduce((no, task) => (task.isFav ? no + 1 : no), 0),

    tasksCount: (s: State) => s.tasks.length,
  },

  actions: {
    fetchTasks: () => getTasks(),

    async addTask(task: Task) {
      const isTaskPosted = await postTask(task);
      if (!isTaskPosted) return;
      this.tasks.push(task);
    },

    async removeTask(id: number) {
      const deletedTask = await deleteTask(id);
      if (!deletedTask) return;
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    async toggleIsFavTask(id: number) {
      const patchedTask = await patchIsFavTask(id);
      if (!patchedTask) return;
      patchedTask.isFav = !patchedTask.isFav;
    },
  },
});
