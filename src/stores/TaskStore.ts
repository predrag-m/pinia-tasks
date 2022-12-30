import { defineStore } from "pinia";

/// defineStore takes 2 arguments (name, object)
/// defineStore returns a function that we are storing inside 'useTaskStore'
/// inside the 'state' we can add multiple properties (not just 'tasks' property)
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play Gloomhaven", isFav: true },
    ],
  }),
});
