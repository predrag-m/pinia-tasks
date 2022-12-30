<script setup lang="ts">
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "@/components/TaskDetails.vue";
import { ref } from "vue";
import type TaskFilter from "@/types/TaskFilter";

/// 'useTaskStore()' returns us the 'store' property that we are placing inside the 'taskStore' constant.
const taskStore = useTaskStore();
const taskFilter = ref<TaskFilter>("all");
</script>

<template>
  <main>
    <!-- heading -->
    <header>
      <img src="@/assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia Tasks</h1>
    </header>
    <!-- filter -->
    <nav class="filter">
      <button @click="taskFilter = 'all'">All Tasks</button>
      <button @click="taskFilter = 'fav'">Favorite Tasks</button>
    </nav>
    <!-- task list -->
    <div v-if="taskFilter === 'all'" class="task-list">
      <p>You have {{ taskStore.totalCount }} tasks left to do:</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <task-details :task="task" />
      </div>
    </div>
    <div v-if="taskFilter === 'fav'" class="task-list">
      <p>
        You have {{ taskStore.favCount }} favorite
        {{ taskStore.favCount === 1 ? "task" : "tasks" }} left to do:
      </p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <task-details :task="task" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
