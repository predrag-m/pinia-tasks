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
  getters: {
    favs: (state: State): Task[] => {
      return state.tasks.filter((task: Task) => task.isFav);
    },
    // finish type notation for arguments
    favCount: (state: State): number => {
      return state.tasks.reduce((accumulator: number, currentValue: Task) => {
        return currentValue.isFav ? accumulator + 1 : accumulator;
      }, 0);
    },
    totalCount: (state: State): number => {
      return state.tasks.length;
    },
  },
});
