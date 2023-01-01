<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTasksStore } from "@/stores/TasksStore";
import { ref } from "vue";
import type { TaskFilter } from "@/types/TaskFilter";
import TaskForm from "@/components/TaskForm.vue";
import TaskList from "@/components/TaskList.vue";

const taskFilter = ref<TaskFilter>("all");
const tasksStore = useTasksStore();
const { isLoading, errorMsg } = storeToRefs(tasksStore);

tasksStore.fetchTasks();
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
        :class="{ active: taskFilter === 'all' }"
      >
        All Tasks
      </button>
      <button
        @click="taskFilter = 'fav'"
        :class="{ active: taskFilter === 'fav' }"
      >
        Favorite Tasks
      </button>
    </nav>
    <!-- loading -->
    <div v-if="isLoading" class="loading">Loading...</div>
    <!-- error message -->
    <div v-else-if="errorMsg" class="error-message">{{ errorMsg }}</div>
    <!-- task list -->
    <div v-else>
      <task-list :taskFilter="taskFilter" />
    </div>
  </main>
</template>

<style scoped></style>
