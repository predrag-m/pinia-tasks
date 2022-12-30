import { defineStore } from "pinia";
import type Task from "@/types/Task";

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
});
