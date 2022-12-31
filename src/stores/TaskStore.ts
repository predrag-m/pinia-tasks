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
      /// change data on the server
      const res = await fetch("http://localhost:3000/tasks/", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log(res.statusText);
        return;
      }

      /// update the store
      this.tasks.push(task);
    },

    async deleteTask(id: number) {
      /// try finding that Task in the store
      const task: Task | undefined = this.tasks.find((t) => t.id === id);
      if (!task) {
        console.log(`Error: couldn't find task with id:${id} inside the store`);
        return;
      }

      /// change data on the server
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.log(res.statusText);
        return;
      }

      /// update the store
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    async toggleFavTask(id: number) {
      /// try finding that Task in the store
      const task: Task | undefined = this.tasks.find((t) => t.id === id);
      if (!task) {
        console.log(`Error: couldn't find task with id:${id} inside the store`);
        return;
      }

      /// change data on the server
      const isFavTemp = !task.isFav;
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: isFavTemp }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        console.log(res.statusText);
        return;
      }

      /// update the store
      task.isFav = !task.isFav;
    },
  },
});
