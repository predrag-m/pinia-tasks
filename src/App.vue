<script setup lang="ts">
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "@/components/TaskDetails.vue";

/// This returns us the 'store' property that we are placing inside the 'taskStore' constant
const taskStore = useTaskStore();
// console.log(taskStore.tasks[0]); // temp
</script>

<template>
  <main>
    <!-- heading -->
    <header>
      <img src="@/assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia Tasks</h1>
    </header>
    <!-- task list -->
    <div class="task-list">
      <div v-for="task in taskStore.tasks" :key="task.id">
        <task-details :task="task"/>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
