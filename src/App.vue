<script setup lang="ts">
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "@/components/TaskDetails.vue";
import TaskForm from "@/components/TaskForm.vue";
import { ref } from "vue";
import type { TaskFilter } from "@/types/TaskFilter";

/// 'useTaskStore()' returns us the 'store' property that we are placing inside the 'taskStore' constant.
const taskStore = useTaskStore();
const taskFilter = ref<TaskFilter>("all");

taskStore.getTasks();
</script>

<template>
  <main>
    <!-- heading -->
    <header>
      <img src="@/assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia Tasks</h1>
    </header>
    <!-- new task form -->
    <div class="new-task-form">
      <task-form />
    </div>
    <!-- filter -->
    <nav class="filter">
      <button
        @click="taskFilter = 'all'"
        :class="{ gray: taskFilter === 'all' }"
      >
        All Tasks
      </button>
      <button
        @click="taskFilter = 'fav'"
        :class="{ gray: taskFilter === 'fav' }"
      >
        Favorite Tasks
      </button>
    </nav>
    <!-- loading -->
    <div v-if="taskStore.isLoading" class="loading">Loading tasks...</div>
    <!-- task list -->
    <div v-else-if="taskStore.tasks">
      <div v-if="taskFilter === 'all'" class="task-list">
        <p>You have {{ taskStore.allTasksCount }} tasks left to do:</p>
        <div v-for="task in taskStore.tasks" :key="task.id">
          <task-details :task="task" />
        </div>
      </div>
      <div v-if="taskFilter === 'fav'" class="task-list">
        <p>
          You have {{ taskStore.favTasksCount }} favorite
          {{ taskStore.favTasksCount === 1 ? "task" : "tasks" }} left to do:
        </p>
        <div v-for="task in taskStore.favTasks" :key="task.id">
          <task-details :task="task" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.gray {
  background-color: #e4e4e4;
}
</style>
