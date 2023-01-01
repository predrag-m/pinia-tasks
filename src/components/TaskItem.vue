<script setup lang="ts">
import { useTasksStore } from "@/stores/TasksStore";
import type { Task } from "@/types/Task";
import type { PropType } from "vue";

defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
});
const tasksStore = useTasksStore();
</script>

<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="tasksStore.removeTask(task.id)" class="material-icons"
        >delete</i
      >
      <i
        @click="tasksStore.toggleIsFavTask(task.id)"
        :class="{ active: task.isFav }"
        class="material-icons"
        >favorite</i
      >
    </div>
  </div>
</template>

<style scoped></style>
